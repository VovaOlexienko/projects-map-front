import { FormProvider } from "react-hook-form";
import { Form } from "react-bootstrap";
import { useAppForm } from "../../hook/useAppForm";
import groupSchema from "./validation";
import { groupApi } from "../../api/groupApi.ts";
import { MenuButton, MenuItem, Menu } from "@szhsin/react-menu";
import { List } from "react-bootstrap-icons";
import { useAppModal } from "../../hook/useAppModal.ts";
import { EditableFormField } from "../../component/form/EditableFormField.tsx";
import { BackgroundHint } from "../../component/background/BackgroundHint.tsx";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Projects } from "../projects/Projects.tsx";
import { Children, cloneElement, ReactElement, useEffect } from "react";
import { GroupDto } from "../../dto/GroupDto.ts";
import { LoaderStruct } from "../../struct/LoaderStruct.ts";

export const Group = () => {
  const { id } = useParams();
  const { data, isFetching } = groupApi.useGetGroupQuery(id);
  return (
    <GroupView
      group={data}
      showLoader={isFetching}
      headerComponent={isFetching ? <Skeleton height="30px" className="my-2" /> : <GroupHeader />}
    />
  );
};

export const GroupView = ({
  group,
  showLoader,
  headerComponent,
}: {
  group?: GroupDto;
  headerComponent: ReactElement;
} & LoaderStruct) => {
  const [updateGroup] = groupApi.useUpdateGroupMutation();
  const { formInstance, submitForm } = useAppForm({
    defaultValues: { id: group?.id, name: group?.name },
    validationSchema: groupSchema,
    onFormSubmit: updateGroup,
    resetFieldIds: ["name"],
  });

  /*todo move form init to another component*/
  useEffect(() => {
    formInstance.reset({ id: group?.id, name: group?.name });
  }, [group, formInstance.reset]);

  return (
    <FormProvider {...formInstance}>
      <Form>
        <div style={{ height: "100px" }}>
          <div className="bg-white pb-3">
            <div className="container">
              <div className="row pt-3 align-items-center position-sticky top-0 z-3">
                {Children.map(headerComponent, (child) => {
                  return cloneElement(child, { data: { submitForm, group } });
                })}
              </div>
            </div>
          </div>
          <hr className="mt-0" />
        </div>
        <div className="overflow-y-auto" style={{ height: `${window.innerHeight - 100}px` }}>
          {!showLoader && group?.projects?.length === 0 ? (
            <BackgroundHint>Створіть новий проєкт</BackgroundHint>
          ) : (
            <Projects groupId={group?.id} projects={group?.projects} showLoader={showLoader} />
          )}
        </div>
      </Form>
    </FormProvider>
  );
};

const GroupHeader = ({ data }: { data?: { group: GroupDto; submitForm: () => void } }) => {
  const createProjectModalStruct = useAppModal("createProject");
  const deleteGroupModalStruct = useAppModal("deleteGroup");

  return (
    data && (
      <>
        <div className="col-11">
          <EditableFormField
            id="name"
            maxLength={50}
            onBlur={data.submitForm}
            offsetFree
            className="fs-4 fw-semibold ms-2"
          />
          {/*todo do not submit form when nothing changed*/}
        </div>
        <div className="col-1 d-flex justify-content-end">
          <Menu
            menuButton={
              <MenuButton className="btn btn-outline-dark">
                <List size="32px" />
              </MenuButton>
            }
          >
            <MenuItem onClick={() => createProjectModalStruct.openModal(data.group)}>Створити проєкт</MenuItem>
            <MenuItem onClick={() => deleteGroupModalStruct.openModal(data.group)}>Видалити групу</MenuItem>
          </Menu>
        </div>
      </>
    )
  );
};

export const SelectGroupHint = () => {
  return <BackgroundHint>Виберіть групу проєктів або створіть нову</BackgroundHint>;
};
