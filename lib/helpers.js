import { Badge } from "@/components/ui/badge";

// Helper function to serialize car data
export const serializeCarData = (car, wishlisted = false) => {
    return {
        ...car,
        price: car.price ? parseFloat(car.price.toString()) : 0,
        createdAt: car.createdAt?.toISOString(),
        updatedAt: car.updatedAt?.toISOString(),
        wishlisted: wishlisted,
    }
};

// Function to format a number as currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

// Function to get the status badge based on the car's status
export const getStatusBadge = (status) => {
    switch (status) {

        case "AVAILABLE":
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100"> Available </Badge>
            )

        case "UNAVAILABLE":
            return (
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100"> Unavailable </Badge>
            )

        case "SOLD":
            return (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"> Sold </Badge>
            )

        default:
            return (
                <Badge variant="outline">{status}</Badge>
            )
    }
};

export const getTestDriveStatusBadge = (status) => {
    switch (status) {
        case "PENDING":
            return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
        case "CONFIRMED":
            return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
        case "COMPLETED":
            return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
        case "CANCELLED":
            return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
        case "NO_SHOW":
            return <Badge className="bg-red-100 text-red-800">No Show</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};
