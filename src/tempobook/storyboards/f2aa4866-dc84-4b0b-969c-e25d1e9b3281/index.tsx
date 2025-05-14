import MemberDetailView from "@/components/dashboard/MemberDetailView";

export default function MemberDetailViewStoryboard() {
  return (
    <div className="bg-white">
      <MemberDetailView memberId="1" isOpen={true} />
    </div>
  );
}
