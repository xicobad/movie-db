import { Tabs, TabsProps } from "antd";

interface NavTabsProps {
  activeTab: string;
  tabChange: (key: string) => void;
}

const tabItems: TabsProps["items"] = [
  { label: "Search", key: "search" },
  { label: "Rated", key: "rated" }
];

const NavTabs: React.FC<NavTabsProps> = ({ activeTab, tabChange }) => {
  return <Tabs activeKey={activeTab} onChange={tabChange} items={tabItems} />;
};

export default NavTabs;