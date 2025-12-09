import Parent from "./ArchitectureFlow/Parent-child-flow";
import UseStateForm from "../src/Hooks/BasicHooks/useState/useStateForm";
import UseStateCrud from "./Hooks/BasicHooks/useState/UseStateCrud";
import UseEffectExample from "./Hooks/BasicHooks/useEffect/useEffectExample";
import DataSending from "./Hooks/BasicHooks/useEffect/DataSending";
import GroupDataSending from "./Hooks/BasicHooks/useEffect/GroupDataSending";
import Filtering from "./Hooks/BasicHooks/useState/Filtering";
import ContextForm from "./Hooks/BasicHooks/useContext/ContextForm";
import ContextTesting from "./Hooks/BasicHooks/useContext/ContextTesting";
import UseRef from "./Hooks/IntermediateHooks/useRef/UseRef";
import UseMemo from "./Hooks/IntermediateHooks/useMemo/UseMemo";
import ProductTable from "./Hooks/IntermediateHooks/useMemo/RealWorldCase";
import Challenge from "./Hooks/IntermediateHooks/useMemo/Challenge";
import WithoutUseCallBack from "./Hooks/IntermediateHooks/useCallback/WithoutUseCallBack";
import SimpleExample from "./Hooks/IntermediateHooks/useReducer/SimpleExample";
import RealWorld from "./Hooks/IntermediateHooks/useReducer/RealWorld";
import Toggling from "./Hooks/CustomHooks/useToggle/Toggling";
import UserInfo from "./Hooks/CustomHooks/useFetch/Users";
import SearchUser from "./Hooks/CustomHooks/useDebounce/SearchBar";
const App = () => {
  return (
    <div>
      {/* <Parent /> */}
      {/* <UseStateForm /> */}
      {/* <UseStateCrud /> */}
      {/* <UseEffectExample /> */}
      {/* <DataSending/> */}
      {/* <Filtering /> */}
      {/* <GroupDataSending/> */}
      {/* <ContextForm />
      <ContextTesting /> */}
      {/* <UseRef /> */}
      {/* <UseMemo /> */}
      {/* <ProductTable/> */}
      {/* <Challenge/> */}
      {/* <WithoutUseCallBack /> */}
      {/* <SimpleExample/> */}
      {/* <RealWorld /> */}
      {/* <Toggling/> */}
      {/* <UserInfo /> */}
      <SearchUser />
    </div>
  );
};

export default App;
