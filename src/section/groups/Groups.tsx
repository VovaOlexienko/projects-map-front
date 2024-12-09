import { Menu, MenuItem, MenuItemStyles, Sidebar } from "react-pro-sidebar";
import { NavLink, Outlet } from "react-router-dom";
import { Cpu, Plus } from "react-bootstrap-icons";
import { useAppModal } from "../../hook/useAppModal.ts";
import { cropText } from "../../util/textUtil.ts";
import { ShortenedGroupDto } from "../../dto/ShortenedGroupDto.ts";
import { groupApi } from "../../api/groupApi.ts";
import { MainBackground } from "../../component/background/MainBackground.tsx";
import Skeleton from "react-loading-skeleton";
import { Children, cloneElement, ReactElement } from "react";

const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: "14px",
    fontWeight: 400,
  },
  button: {
    margin: "10px",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#2d2e39",
    },
    "&.active": {
      backgroundColor: "#444555",
    },
  },
};

const groupsMock = [{ id: "-1" }, { id: "-2" }, { id: "-3" }, { id: "-4" }] as ShortenedGroupDto[];

export const Groups = () => {
  const { data, isFetching } = groupApi.useGetGroupsQuery();

  return (
    <GroupsView
      groups={isFetching ? groupsMock : data}
      disabledLinks={isFetching}
      groupItemComponent={isFetching ? <Skeleton height="20px" /> : <GroupItem />}
    />
  );
};

const GroupsView = ({
  groups,
  disabledLinks,
  groupItemComponent,
}: {
  groups?: ShortenedGroupDto[];
  disabledLinks: boolean;
  groupItemComponent: ReactElement;
}) => {
  return (
    <div className="d-flex h-100 overflow-hidden">
      <div className="d-flex">
        <Sidebar
          backgroundColor="#202123"
          rootStyles={{
            color: "white",
          }}
          className="fixed-bottom"
          style={{ height: "100vh" }}
        >
          <Menu menuItemStyles={menuItemStyles}>
            <CreateItem />
            {groups?.map((group) => (
              <MenuItem key={group.id} disabled={disabledLinks} component={<NavLink to={`/group/${group.id}`} />}>
                {Children.map(groupItemComponent, (child) => {
                  return cloneElement(child, { data: { group } });
                })}
              </MenuItem>
            ))}
          </Menu>
        </Sidebar>
      </div>
      <MainBackground>
        <Outlet />
      </MainBackground>
    </div>
  );
};

const CreateItem = () => {
  const modalStruct = useAppModal("createGroup");

  return (
    <MenuItem onClick={() => modalStruct.openModal()} style={{ borderRadius: "5px", border: "1px solid white" }}>
      <div className="d-flex flex-row align-items-center">
        <Plus color="white" size="16" />
        Створити групу проєктів
      </div>
    </MenuItem>
  );
};

const GroupItem = ({ data }: { data?: { group: ShortenedGroupDto } }) => {
  return (
    data && (
      <div className="d-flex flex-row align-items-center">
        <Cpu size="25px" className="me-2" />
        <span>{cropText({ value: data.group.name, length: 15 })}</span>
      </div>
    )
  );
};
