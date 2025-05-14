import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CreditCardIcon,
  ActivityIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  CalendarDaysIcon,
} from "lucide-react";

interface Visit {
  id: string;
  date: Date;
  timeIn: string;
  timeOut: string | null;
  duration: string | null;
}

interface Subscription {
  id: string;
  planName: string;
  planType: "monthly" | "quarterly" | "yearly";
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "expiring-soon";
  price: number;
}

interface MemberDetailViewProps {
  memberId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const MemberDetailView: React.FC<MemberDetailViewProps> = ({
  memberId = "1",
  isOpen = true,
  onClose = () => {},
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [renewDialogOpen, setRenewDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [recordVisitDialogOpen, setRecordVisitDialogOpen] = useState(false);

  // Mock data
  const member = {
    id: memberId,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fitness Street, Gym City, GC 12345",
    joinDate: new Date(2023, 1, 15),
    subscription: {
      id: "sub-123",
      planName: "Premium Fitness",
      planType: "monthly" as const,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 6, 1),
      status: "active" as const,
      price: 49.99,
    },
    totalVisits: 24,
    lastVisit: new Date(2023, 5, 28),
    averageVisitsPerWeek: 3.5,
  };

  const visitHistory: Visit[] = [
    {
      id: "v1",
      date: new Date(2023, 5, 28),
      timeIn: "08:30 AM",
      timeOut: "10:15 AM",
      duration: "1h 45m",
    },
    {
      id: "v2",
      date: new Date(2023, 5, 26),
      timeIn: "07:45 AM",
      timeOut: "09:30 AM",
      duration: "1h 45m",
    },
    {
      id: "v3",
      date: new Date(2023, 5, 24),
      timeIn: "06:15 PM",
      timeOut: "08:00 PM",
      duration: "1h 45m",
    },
    {
      id: "v4",
      date: new Date(2023, 5, 21),
      timeIn: "05:30 PM",
      timeOut: "07:15 PM",
      duration: "1h 45m",
    },
    {
      id: "v5",
      date: new Date(2023, 5, 19),
      timeIn: "08:00 AM",
      timeOut: "09:45 AM",
      duration: "1h 45m",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "expiring-soon":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleRecordVisit = () => {
    // Logic to record a new visit
    setRecordVisitDialogOpen(false);
  };

  const handleRenewSubscription = () => {
    // Logic to renew subscription
    setRenewDialogOpen(false);
  };

  const handleCancelSubscription = () => {
    // Logic to cancel subscription
    setCancelDialogOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
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
            <h1 className="text-2xl font-bold">{member.name}</h1>
            <p className="text-gray-500">{member.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className={getStatusColor(member.subscription.status)}
              >
                {member.subscription.status === "active"
                  ? "Active"
                  : member.subscription.status === "expired"
                    ? "Expired"
                    : "Expiring Soon"}
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {member.subscription.planType.charAt(0).toUpperCase() +
                  member.subscription.planType.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="visits">Visit History</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCardIcon className="h-5 w-5" />
                  Subscription Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Plan:</span>
                    <span className="font-medium">
                      {member.subscription.planName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">
                      {member.subscription.planType.charAt(0).toUpperCase() +
                        member.subscription.planType.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span
                      className={`font-medium ${
                        member.subscription.status === "active"
                          ? "text-green-600"
                          : member.subscription.status === "expired"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {member.subscription.status === "active"
                        ? "Active"
                        : member.subscription.status === "expired"
                          ? "Expired"
                          : "Expiring Soon"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expiration:</span>
                    <span className="font-medium">
                      {member.subscription.endDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1"
                    onClick={() => setRenewDialogOpen(true)}
                  >
                    Renew/Extend
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCancelDialogOpen(true)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ActivityIcon className="h-5 w-5" />
                  Visit Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Visits:</span>
                    <span className="font-medium">{member.totalVisits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Visit:</span>
                    <span className="font-medium">
                      {member.lastVisit.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Avg. Visits/Week:</span>
                    <span className="font-medium">
                      {member.averageVisitsPerWeek}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => setRecordVisitDialogOpen(true)}
                >
                  Record New Visit
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visitHistory.slice(0, 3).map((visit) => (
                  <div
                    key={visit.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {visit.date.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {visit.timeIn} - {visit.timeOut}
                        </p>
                      </div>
                    </div>
                    <Badge>{visit.duration}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("visits-tab")?.click()}
              >
                View All Visits
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                Manage member's subscription plan and status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Current Plan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Plan Name:</span>
                      <span className="font-medium">
                        {member.subscription.planName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Plan Type:</span>
                      <span className="font-medium">
                        {member.subscription.planType.charAt(0).toUpperCase() +
                          member.subscription.planType.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-medium">
                        ${member.subscription.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date:</span>
                      <span className="font-medium">
                        {member.subscription.startDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">End Date:</span>
                      <span className="font-medium">
                        {member.subscription.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <Badge
                        variant="outline"
                        className={getStatusColor(member.subscription.status)}
                      >
                        {member.subscription.status === "active"
                          ? "Active"
                          : member.subscription.status === "expired"
                            ? "Expired"
                            : "Expiring Soon"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Subscription Timeline
                  </h3>
                  <div className="border rounded-md p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) =>
                        date < member.subscription.startDate ||
                        date > member.subscription.endDate
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Subscription Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => setRenewDialogOpen(true)}>
                    <CalendarIcon className="mr-2 h-4 w-4" /> Renew/Extend
                    Subscription
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCancelDialogOpen(true)}
                  >
                    <AlertCircleIcon className="mr-2 h-4 w-4" /> Cancel
                    Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visits">
          <Card>
            <CardHeader>
              <CardTitle>Visit History</CardTitle>
              <CardDescription>Track member's gym attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">
                    Total Visits:{" "}
                    <span className="font-medium">{member.totalVisits}</span>
                  </p>
                </div>
                <Button onClick={() => setRecordVisitDialogOpen(true)}>
                  <CheckCircleIcon className="mr-2 h-4 w-4" /> Record New Visit
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left border-b">Date</th>
                      <th className="py-2 px-4 text-left border-b">Time In</th>
                      <th className="py-2 px-4 text-left border-b">Time Out</th>
                      <th className="py-2 px-4 text-left border-b">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitHistory.map((visit) => (
                      <tr key={visit.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">
                          {visit.date.toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 border-b">{visit.timeIn}</td>
                        <td className="py-3 px-4 border-b">
                          {visit.timeOut || "-"}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {visit.duration || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Member's contact and personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="mt-1">{member.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h3>
                    <p className="mt-1">{member.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Phone Number
                    </h3>
                    <p className="mt-1">{member.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Address
                    </h3>
                    <p className="mt-1">{member.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Member Since
                    </h3>
                    <p className="mt-1">
                      {member.joinDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Record Visit Dialog */}
      <Dialog
        open={recordVisitDialogOpen}
        onOpenChange={setRecordVisitDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Visit</DialogTitle>
            <DialogDescription>
              Log a new gym visit for {member.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Date</label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={new Date()}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Time In</label>
              <div className="col-span-3">
                <Select defaultValue="08:00">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRecordVisitDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleRecordVisit}>Record Visit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Renew Subscription Dialog */}
      <Dialog open={renewDialogOpen} onOpenChange={setRenewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renew or Extend Subscription</DialogTitle>
            <DialogDescription>
              Update the subscription for {member.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Plan</label>
              <div className="col-span-3">
                <Select defaultValue="premium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Fitness</SelectItem>
                    <SelectItem value="standard">Standard Fitness</SelectItem>
                    <SelectItem value="premium">Premium Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Duration</label>
              <div className="col-span-3">
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Start Date</label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={new Date()}
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenewSubscription}>Confirm Renewal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the subscription for {member.name}
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCancelDialogOpen(false)}>
              No, keep subscription
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelSubscription}>
              Yes, cancel subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MemberDetailView;
