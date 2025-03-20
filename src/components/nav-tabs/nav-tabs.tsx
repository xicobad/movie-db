import { Tabs } from "antd";

const { TabPane } = Tabs;

interface NavTabsProps {
  activeTab: string;
  tabChange: (key: string) => void;
}

const NavTabs: React.FC<NavTabsProps> = ({ activeTab, tabChange }) => {
  return (
    <Tabs activeKey={activeTab} onChange={tabChange}>
      <TabPane tab="Search" key="search" />
      <TabPane tab="Rated" key="rated" />
    </Tabs>
  );
};

export default NavTabs;
