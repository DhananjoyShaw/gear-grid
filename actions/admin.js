"use server";

import { serializeCarData } from "@/lib/helpers";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export async function getAdmin() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    // If user not found in our db or not an admin, return not authorized
    if (!user || user.role !== "ADMIN") {
        return { authorized: false, reason: "not-admin" };
    }

    return { authorized: true, user };
}


// Get all test drives for admin with filters
export async function getAdminTestDrives({ search = "", status = "" }) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        // Verify admin status
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user || user.role !== "ADMIN") {
            throw new Error("Unauthorized access");
        }

        // Build where conditions
        let where = {};

        // Add status filter
        if (status) {
            where.status = status;
        }

        // Add search filter
        if (search) {
            where.OR = [
                {
                    car: {
                        OR: [
                            { make: { contains: search, mode: "insensitive" } },
                            { model: { contains: search, mode: "insensitive" } },
                        ],
                    },
                },
                {
                    user: {
                        OR: [
                            { name: { contains: search, mode: "insensitive" } },
                            { email: { contains: search, mode: "insensitive" } },
                        ],
                    },
                },
            ];
        }

        // Get bookings
        const bookings = await db.testDriveBooking.findMany({
            where,
            include: {
                car: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        imageUrl: true,
                        phone: true,
                    },
                },
            },
            orderBy: [{ bookingDate: "desc" }, { startTime: "asc" }],
        });

        // Format the bookings
        const formattedBookings = bookings.map((booking) => ({
            id: booking.id,
            carId: booking.carId,
            car: serializeCarData(booking.car),
            userId: booking.userId,
            user: booking.user,
            bookingDate: booking.bookingDate.toISOString(),
            startTime: booking.startTime,
            endTime: booking.endTime,
            status: booking.status,
            notes: booking.notes,
            createdAt: booking.createdAt.toISOString(),
            updatedAt: booking.updatedAt.toISOString(),
        }));

        return {
            success: true,
            data: formattedBookings,
        };
    } catch (error) {
        console.error("Error fetching test drives:", error);
        return {
            success: false,
            error: error.message,
        };
    }
}


// Update test drive status
export async function updateTestDriveStatus(bookingId, newStatus) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        // Verify admin status
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user || user.role !== "ADMIN") {
            throw new Error("Unauthorized access");
        }

        // Get the booking
        const booking = await db.testDriveBooking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new Error("Booking not found");
        }

        // Validate status
        const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW",];
        if (!validStatuses.includes(newStatus)) {
            return {
                success: false,
                error: "Invalid status",
            };
        }

        // Update status
        await db.testDriveBooking.update({
            where: { id: bookingId },
            data: { status: newStatus },
        });

        // Revalidate paths
        revalidatePath("/admin/test-drives");
        revalidatePath("/reservations");

        return {
            success: true,
            message: "Test drive status updated successfully",
        };
    } catch (error) {
        throw new Error("Error updating test drive status:" + error.message);
    }
}

