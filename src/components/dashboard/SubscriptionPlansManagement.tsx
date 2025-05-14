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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Pencil, Trash2, Filter } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  type: "daily" | "monthly" | "yearly" | "custom";
  duration: number; // in days
  price: number;
  description: string;
  status: "active" | "inactive";
  features: string[];
  createdAt: Date;
}

const SubscriptionPlansManagement: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "plan-1",
      name: "Basic Monthly",
      type: "monthly",
      duration: 30,
      price: 29.99,
      description: "Basic gym access with standard equipment",
      status: "active",
      features: ["Gym access", "Standard equipment", "Locker access"],
      createdAt: new Date(2023, 1, 15),
    },
    {
      id: "plan-2",
      name: "Premium Monthly",
      type: "monthly",
      duration: 30,
      price: 49.99,
      description: "Full access to gym and classes",
      status: "active",
      features: [
        "24/7 Gym access",
        "All equipment",
        "Group classes",
        "Locker access",
        "Towel service",
      ],
      createdAt: new Date(2023, 2, 10),
    },
    {
      id: "plan-3",
      name: "Annual Membership",
      type: "yearly",
      duration: 365,
      price: 499.99,
      description: "Annual membership with all premium features at a discount",
      status: "active",
      features: [
        "24/7 Gym access",
        "All equipment",
        "Unlimited classes",
        "Personal trainer (2 sessions/month)",
        "Locker access",
        "Towel service",
        "Spa access",
      ],
      createdAt: new Date(2023, 0, 5),
    },
    {
      id: "plan-4",
      name: "Day Pass",
      type: "daily",
      duration: 1,
      price: 15.99,
      description: "Single day access to all facilities",
      status: "active",
      features: ["Full day gym access", "All equipment", "Locker access"],
      createdAt: new Date(2023, 3, 20),
    },
    {
      id: "plan-5",
      name: "Student Monthly",
      type: "monthly",
      duration: 30,
      price: 24.99,
      description: "Discounted monthly plan for students",
      status: "active",
      features: [
        "Gym access (weekdays only)",
        "Standard equipment",
        "Locker access",
      ],
      createdAt: new Date(2023, 4, 12),
    },
    {
      id: "plan-6",
      name: "Summer Special",
      type: "custom",
      duration: 90,
      price: 119.99,
      description: "Special 3-month summer membership",
      status: "inactive",
      features: ["Gym access", "All equipment", "Pool access", "Group classes"],
      createdAt: new Date(2023, 5, 1),
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // New plan form state
  const [newPlan, setNewPlan] = useState<Omit<Plan, "id" | "createdAt">>({
    name: "",
    type: "monthly",
    duration: 30,
    price: 0,
    description: "",
    status: "active",
    features: [],
  });

  // Feature input state
  const [featureInput, setFeatureInput] = useState("");

  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      if (currentPlan) {
        setCurrentPlan({
          ...currentPlan,
          features: [...currentPlan.features, featureInput.trim()],
        });
      } else {
        setNewPlan({
          ...newPlan,
          features: [...newPlan.features, featureInput.trim()],
        });
      }
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (currentPlan) {
      const updatedFeatures = [...currentPlan.features];
      updatedFeatures.splice(index, 1);
      setCurrentPlan({
        ...currentPlan,
        features: updatedFeatures,
      });
    } else {
      const updatedFeatures = [...newPlan.features];
      updatedFeatures.splice(index, 1);
      setNewPlan({
        ...newPlan,
        features: updatedFeatures,
      });
    }
  };

  const handleAddPlan = () => {
    const newPlanWithId: Plan = {
      ...newPlan,
      id: `plan-${plans.length + 1}`,
      createdAt: new Date(),
    };
    setPlans([...plans, newPlanWithId]);
    setNewPlan({
      name: "",
      type: "monthly",
      duration: 30,
      price: 0,
      description: "",
      status: "active",
      features: [],
    });
    setIsAddDialogOpen(false);
  };

  const handleEditPlan = () => {
    if (currentPlan) {
      const updatedPlans = plans.map((plan) =>
        plan.id === currentPlan.id ? currentPlan : plan,
      );
      setPlans(updatedPlans);
      setCurrentPlan(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeletePlan = () => {
    if (currentPlan) {
      const updatedPlans = plans.filter((plan) => plan.id !== currentPlan.id);
      setPlans(updatedPlans);
      setCurrentPlan(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const filteredPlans = plans.filter((plan) => {
    const typeMatch = filterType === "all" || plan.type === filterType;
    const statusMatch = filterStatus === "all" || plan.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const getDurationText = (plan: Plan) => {
    switch (plan.type) {
      case "daily":
        return plan.duration === 1 ? "1 day" : `${plan.duration} days`;
      case "monthly":
        return plan.duration === 30
          ? "1 month"
          : `${Math.round(plan.duration / 30)} months`;
      case "yearly":
        return plan.duration === 365
          ? "1 year"
          : `${Math.round(plan.duration / 365)} years`;
      case "custom":
        if (plan.duration < 30) {
          return `${plan.duration} days`;
        } else if (plan.duration < 365) {
          return `${Math.round(plan.duration / 30)} months`;
        } else {
          return `${Math.round(plan.duration / 365)} years`;
        }
      default:
        return `${plan.duration} days`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <p className="text-gray-500">
            Manage your subscription plans and pricing
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Add New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Subscription Plan</DialogTitle>
              <DialogDescription>
                Add a new subscription plan to your offerings
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    value={newPlan.name}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, name: e.target.value })
                    }
                    placeholder="Premium Membership"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPlan.price}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder="49.99"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Plan Type</Label>
                  <Select
                    value={newPlan.type}
                    onValueChange={(
                      value: "daily" | "monthly" | "yearly" | "custom",
                    ) => setNewPlan({ ...newPlan, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Duration (
                    {newPlan.type === "daily"
                      ? "days"
                      : newPlan.type === "monthly"
                        ? "months"
                        : newPlan.type === "yearly"
                          ? "years"
                          : "days"}
                    )
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={
                      newPlan.type === "monthly"
                        ? newPlan.duration / 30
                        : newPlan.type === "yearly"
                          ? newPlan.duration / 365
                          : newPlan.duration
                    }
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      let duration = value;
                      if (newPlan.type === "monthly") duration = value * 30;
                      if (newPlan.type === "yearly") duration = value * 365;
                      setNewPlan({ ...newPlan, duration });
                    }}
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPlan.description}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, description: e.target.value })
                  }
                  placeholder="Describe the plan benefits"
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a feature"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddFeature}>
                    Add
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {newPlan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <span>{feature}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newPlan.status === "active"}
                  onCheckedChange={(checked) =>
                    setNewPlan({
                      ...newPlan,
                      status: checked ? "active" : "inactive",
                    })
                  }
                />
                <Label htmlFor="status">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddPlan}>Create Plan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Plans</CardTitle>
          <CardDescription>Narrow down the list of plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label>Plan Type</Label>
              <Select
                value={filterType}
                onValueChange={(value) => setFilterType(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Subscription Plans</CardTitle>
          <CardDescription>{filteredPlans.length} plans found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {plan.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getDurationText(plan)}</TableCell>
                  <TableCell>${plan.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        plan.status === "active" ? "default" : "secondary"
                      }
                      className={`${plan.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {plan.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCurrentPlan(plan);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCurrentPlan(plan);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>
              Update the details of this subscription plan
            </DialogDescription>
          </DialogHeader>
          {currentPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Plan Name</Label>
                  <Input
                    id="edit-name"
                    value={currentPlan.name}
                    onChange={(e) =>
                      setCurrentPlan({
                        ...currentPlan,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentPlan.price}
                    onChange={(e) =>
                      setCurrentPlan({
                        ...currentPlan,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Plan Type</Label>
                  <Select
                    value={currentPlan.type}
                    onValueChange={(
                      value: "daily" | "monthly" | "yearly" | "custom",
                    ) => setCurrentPlan({ ...currentPlan, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">
                    Duration (
                    {currentPlan.type === "daily"
                      ? "days"
                      : currentPlan.type === "monthly"
                        ? "months"
                        : currentPlan.type === "yearly"
                          ? "years"
                          : "days"}
                    )
                  </Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={
                      currentPlan.type === "monthly"
                        ? currentPlan.duration / 30
                        : currentPlan.type === "yearly"
                          ? currentPlan.duration / 365
                          : currentPlan.duration
                    }
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      let duration = value;
                      if (currentPlan.type === "monthly") duration = value * 30;
                      if (currentPlan.type === "yearly") duration = value * 365;
                      setCurrentPlan({ ...currentPlan, duration });
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentPlan.description}
                  onChange={(e) =>
                    setCurrentPlan({
                      ...currentPlan,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a feature"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddFeature}>
                    Add
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <span>{feature}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-status"
                  checked={currentPlan.status === "active"}
                  onCheckedChange={(checked) =>
                    setCurrentPlan({
                      ...currentPlan,
                      status: checked ? "active" : "inactive",
                    })
                  }
                />
                <Label htmlFor="edit-status">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditPlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Plan Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the{" "}
              <span className="font-semibold">{currentPlan?.name}</span> plan.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePlan}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubscriptionPlansManagement;
