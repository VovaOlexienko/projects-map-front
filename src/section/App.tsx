import { Groups } from "./groups/Groups.tsx";
import { NotifyContainer } from "../component/notifier/Notifier.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../config/store.ts";
import { Modals } from "../modal/Modals.tsx";
import { Catcher } from "../component/catcher/Catcher.tsx";
import { Group, SelectGroupHint } from "./group/Group.tsx";

export const App = () => {
  return (
    <Catcher>
      <BrowserRouter basename={import.meta.env.VITE_APP_BASENAME}>
        <Provider store={store}>
          <Routes>
            <Route path="*" element={<Groups />}>
              <Route index element={<SelectGroupHint />} />
              <Route path="group/:id" element={<Group />} />
            </Route>
          </Routes>
          <Modals />
        </Provider>
        <NotifyContainer />
      </BrowserRouter>
    </Catcher>
  );
};
