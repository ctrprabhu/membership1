import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberDetailView from "./MemberDetailView";
import {
  Search,
  PlusCircle,
  Filter,
  UserPlus,
  CalendarIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: Date;
  subscription: {
    id: string;
    planName: string;
    planType: "daily" | "monthly" | "yearly" | "custom";
    startDate: Date;
    endDate: Date;
    status: "active" | "expired" | "expiring-soon";
    price: number;
  };
  totalVisits: number;
  lastVisit: Date | null;
  averageVisitsPerWeek: number;
}

const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      joinDate: new Date(2023, 1, 15),
      subscription: {
        id: "sub-123",
        planName: "Premium Monthly",
        planType: "monthly",
        startDate: new Date(2023, 5, 1),
        endDate: new Date(2023, 6, 1),
        status: "active",
        price: 49.99,
      },
      totalVisits: 24,
      lastVisit: new Date(2023, 5, 28),
      averageVisitsPerWeek: 3.5,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      joinDate: new Date(2023, 0, 10),
      subscription: {
        id: "sub-456",
        planName: "Annual Membership",
        planType: "yearly",
        startDate: new Date(2023, 0, 10),
        endDate: new Date(2024, 0, 10),
        status: "active",
        price: 499.99,
      },
      totalVisits: 87,
      lastVisit: new Date(2023, 5, 29),
      averageVisitsPerWeek: 4.2,
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 234-5678",
      joinDate: new Date(2023, 2, 5),
      subscription: {
        id: "sub-789",
        planName: "Basic Monthly",
        planType: "monthly",
        startDate: new Date(2023, 5, 5),
        endDate: new Date(2023, 6, 5),
        status: "active",
        price: 29.99,
      },
      totalVisits: 18,
      lastVisit: new Date(2023, 5, 27),
      averageVisitsPerWeek: 2.8,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 345-6789",
      joinDate: new Date(2023, 3, 20),
      subscription: {
        id: "sub-101",
        planName: "Student Monthly",
        planType: "monthly",
        startDate: new Date(2023, 5, 20),
        endDate: new Date(2023, 6, 20),
        status: "active",
        price: 24.99,
      },
      totalVisits: 12,
      lastVisit: new Date(2023, 5, 26),
      averageVisitsPerWeek: 2.0,
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 456-7890",
      joinDate: new Date(2023, 4, 8),
      subscription: {
        id: "sub-202",
        planName: "Premium Monthly",
        planType: "monthly",
        startDate: new Date(2023, 4, 8),
        endDate: new Date(2023, 5, 8),
        status: "expired",
        price: 49.99,
      },
      totalVisits: 8,
      lastVisit: new Date(2023, 5, 7),
      averageVisitsPerWeek: 1.5,
    },
    {
      id: "6",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      phone: "+1 (555) 567-8901",
      joinDate: new Date(2023, 2, 15),
      subscription: {
        id: "sub-303",
        planName: "Annual Membership",
        planType: "yearly",
        startDate: new Date(2023, 2, 15),
        endDate: new Date(2023, 6, 15),
        status: "expiring-soon",
        price: 499.99,
      },
      totalVisits: 45,
      lastVisit: new Date(2023, 5, 29),
      averageVisitsPerWeek: 3.2,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);

  // New member form state
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Enrollment form state
  const [enrollment, setEnrollment] = useState({
    memberId: "",
    planName: "Premium Monthly",
    startDate: new Date(),
  });

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || member.subscription.status === filterStatus;

    const matchesPlan =
      filterPlan === "all" || member.subscription.planType === filterPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleAddMember = () => {
    const newMemberId = `${members.length + 1}`;
    const memberToAdd: Member = {
      id: newMemberId,
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone,
      joinDate: new Date(),
      subscription: {
        id: `sub-${Date.now()}`,
        planName: "Basic Monthly",
        planType: "monthly",
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        status: "active",
        price: 29.99,
      },
      totalVisits: 0,
      lastVisit: null,
      averageVisitsPerWeek: 0,
    };

    setMembers([...members, memberToAdd]);
    setNewMember({ name: "", email: "", phone: "" });
    setIsAddMemberDialogOpen(false);
  };

  const handleEnrollMember = () => {
    // Find the member
    const memberToUpdate = members.find(
      (member) => member.id === enrollment.memberId,
    );

    if (memberToUpdate) {
      // Calculate end date based on plan type
      let endDate = new Date(enrollment.startDate);
      if (enrollment.planName.includes("Monthly")) {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (enrollment.planName.includes("Annual")) {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else if (enrollment.planName.includes("Day")) {
        endDate.setDate(endDate.getDate() + 1);
      }

      // Update the member's subscription
      const updatedMember = {
        ...memberToUpdate,
        subscription: {
          ...memberToUpdate.subscription,
          planName: enrollment.planName,
          planType: enrollment.planName.includes("Monthly")
            ? "monthly"
            : enrollment.planName.includes("Annual")
              ? "yearly"
              : "daily",
          startDate: enrollment.startDate,
          endDate: endDate,
          status: "active",
        },
      };

      // Update the members array
      const updatedMembers = members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member,
      );

      setMembers(updatedMembers);
      setIsEnrollDialogOpen(false);
    }
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setIsDetailViewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Member Management</h1>
          <p className="text-gray-500">
            Manage your gym members and their subscriptions
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isAddMemberDialogOpen}
            onOpenChange={setIsAddMemberDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" /> Add New Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>
                  Create a new member profile
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember({ ...newMember, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) =>
                      setNewMember({ ...newMember, email: e.target.value })
                    }
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newMember.phone}
                    onChange={(e) =>
                      setNewMember({ ...newMember, phone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddMemberDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddMember}>Add Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isEnrollDialogOpen}
            onOpenChange={setIsEnrollDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Enroll Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enroll Member in Plan</DialogTitle>
                <DialogDescription>
                  Select a member and plan to enroll them
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="member">Select Member</Label>
                  <Select
                    value={enrollment.memberId}
                    onValueChange={(value) =>
                      setEnrollment({ ...enrollment, memberId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">Select Plan</Label>
                  <Select
                    value={enrollment.planName}
                    onValueChange={(value) =>
                      setEnrollment({ ...enrollment, planName: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic Monthly">
                        Basic Monthly
                      </SelectItem>
                      <SelectItem value="Premium Monthly">
                        Premium Monthly
                      </SelectItem>
                      <SelectItem value="Annual Membership">
                        Annual Membership
                      </SelectItem>
                      <SelectItem value="Day Pass">Day Pass</SelectItem>
                      <SelectItem value="Student Monthly">
                        Student Monthly
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <div className="border rounded-md p-2">
                    <Calendar
                      mode="single"
                      selected={enrollment.startDate}
                      onSelect={(date) =>
                        date &&
                        setEnrollment({ ...enrollment, startDate: date })
                      }
                      className="rounded-md"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEnrollDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEnrollMember}>Enroll Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find members quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or email"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <Select
                  value={filterStatus}
                  onValueChange={(value) => setFilterStatus(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={filterPlan}
                  onValueChange={(value) => setFilterPlan(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>
            {filteredMembers.length} members found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`}
                          alt={member.name}
                        />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {member.subscription.planName}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.subscription.status === "active"
                          ? "default"
                          : member.subscription.status === "expired"
                            ? "destructive"
                            : "outline"
                      }
                      className={
                        member.subscription.status === "active"
                          ? "bg-green-100 text-green-800"
                          : member.subscription.status === "expired"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {member.subscription.status === "active"
                        ? "Active"
                        : member.subscription.status === "expired"
                          ? "Expired"
                          : "Expiring Soon"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.subscription.endDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {member.lastVisit
                      ? member.lastVisit.toLocaleDateString()
                      : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewMember(member)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Member Detail View */}
      {selectedMember && (
        <MemberDetailView
          memberId={selectedMember.id}
          isOpen={isDetailViewOpen}
          onClose={() => setIsDetailViewOpen(false)}
        />
      )}
    </div>
  );
};

export default MemberManagement;
