import AdminDrawer from "./AdminDrawer";

const AdminLayout = (props) => {
  const siteContent = props.children;
  return <AdminDrawer content={siteContent} />;
};

export default AdminLayout;
