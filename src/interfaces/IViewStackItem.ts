export default interface IViewStackItem {
  component: JSX.Element;
  resolver: (value: any) => void;
}
