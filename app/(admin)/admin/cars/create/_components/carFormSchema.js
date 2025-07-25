import * as z from "zod";

// Define form schema with Zod
export const carFormSchema = z.object({
    make: z.string().min(1, "Make is required"),

    model: z.string().min(1, "Model is required"),

    year: z.string().refine((val) => {
        const year = parseInt(val);
        return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1;
    }, "Valid year required"),

    price: z.string().min(1, "Price is required"),

    mileage: z.string().min(1, "Mileage is required"),

    color: z.string().min(1, "Color is required"),

    fuelType: z.string().min(1, "Fuel type is required"),

    transmission: z.string().min(1, "Transmission is required"),

    bodyType: z.string().min(1, "Body type is required"),

    seats: z.string().refine((val) => {
        if (!val) return true; // Allow empty for optional field
        const seats = parseInt(val);
        return !isNaN(seats) && seats >= 1 && seats <= 12;
    }, "Seats must be a number between 1 and 12"),

    description: z.string().min(10, "Description must be at least 10 characters"),

    status: z.enum(["AVAILABLE", "UNAVAILABLE", "SOLD"]),

    featured: z.boolean().default(false),
});
