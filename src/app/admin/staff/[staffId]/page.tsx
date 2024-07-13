import { PageHeader } from "@/components/navbar/page-header";

const StaffByIdPage = ({
  params: { staffId },
}: {
  params: { staffId: string };
}) => {
  return (
    <div>
      <PageHeader
        title={`Staff by id ${staffId}`}
        links={[
          { href: "/admin", title: "Admin" },
          { href: "/admin/staff", title: "Staff" },
          { href: `/admin/staff/${staffId}`, title: `Staff by id ${staffId}` },
        ]}
      />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
        impedit reiciendis. Sit repellat magni voluptatum quo esse tempora porro
        facere aperiam odit, a accusantium natus? Ea neque porro ex esse.
      </p>
    </div>
  );
};

export default StaffByIdPage;
