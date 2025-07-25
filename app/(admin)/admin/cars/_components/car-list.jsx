"use client";

import { useEffect, useState, useCallback } from "react";
import { CarIcon, Eye, Loader2, MoreHorizontal, Plus, Search, Star, StarOff, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Input, Button, Card, CardContent, Table, TableHeader,
    TableBody, TableHead, TableRow, TableCell, DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger, Dialog, DialogContent,
    DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/index";
import { deleteCar, getCars, updateCarStatus } from "@/actions/cars";
import { formatCurrency, getStatusBadge } from "@/lib/helpers";
import useFetch from "@/hooks/use-fetch";
import Image from "next/image";

const CarsList = () => {
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const router = useRouter();

    const {
        loading: loadingCars,
        fn: fetchCars,
        data: carsData,
        error: carsError,
    } = useFetch(getCars);

    const {
        loading: deletingCar,
        fn: deleteCarFn,
        data: deleteResult,
        error: deleteError,
    } = useFetch(deleteCar);

    const {
        loading: updatingCar,
        fn: updateCarStatusFn,
        data: updateResult,
        error: updateError,
    } = useFetch(updateCarStatus);

    // Debounced search function
    const debouncedSearch = useCallback(
        (() => {
            let timeoutId;
            return (searchTerm) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setSearch(searchTerm);
                }, 300);
            };
        })(),
        []
    );

    // Handle search input changes
    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSearch(value);
    };

    // Clear search
    const clearSearch = () => {
        setSearchInput("");
        setSearch("");
    };

    // Initial fetch and refetch on search changes
    useEffect(() => {
        fetchCars(search);
    }, [search]);

    // Handle successful operations
    useEffect(() => {
        if (deleteResult?.success) {
            toast.success("Car deleted successfully");
            fetchCars(search);
        }

        if (updateResult?.success) {
            toast.success("Car updated successfully");
            fetchCars(search);
        }
    }, [deleteResult, updateResult, search]);

    // Handle errors
    useEffect(() => {
        if (carsError) {
            toast.error("Failed to load cars");
        }

        if (deleteError) {
            toast.error("Failed to delete car");
        }

        if (updateError) {
            toast.error("Failed to update car");
        }
    }, [carsError, deleteError, updateError]);

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(searchInput);
        setIsSearching(false);
    };

    // Handle delete car
    const handleDeleteCar = async () => {
        if (!carToDelete) return;

        await deleteCarFn(carToDelete.id);
        setDeleteDialogOpen(false);
        setCarToDelete(null);
    };

    // Handle toggle featured status
    const handleToggleFeatured = async (car) => {
        if (updatingCar) return;
        await updateCarStatusFn(car.id, { featured: !car.featured });
    };

    // Handle status change
    const handleStatusUpdate = async (car, newStatus) => {
        if (updatingCar) return;
        setOpenDropdownId(null); // Close dropdown
        await updateCarStatusFn(car.id, { status: newStatus });
    };

    // Handle view car
    const handleViewCar = (carId) => {
        setOpenDropdownId(null); // Close dropdown
        router.push(`/cars/${carId}`);
    };

    // Handle delete option click
    const handleDeleteOptionClick = (car) => {
        setOpenDropdownId(null); // Close dropdown
        setCarToDelete(car);
        setDeleteDialogOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <Button onClick={() => router.push("/admin/cars/create")} className="flex items-center">
                    <Plus className="h-4 w-4" />
                    Add Car
                </Button>
                <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search cars..."
                            className="pl-9 pr-9 w-full sm:w-80"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    clearSearch();
                                }
                            }}
                        />
                    </div>
                </form>
            </div>
            {/* Cars Table */}
            <Card>
                <CardContent className="p-0">
                    {
                        loadingCars && !carsData ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                        ) : carsData?.success && carsData.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead> Make & Model </TableHead>
                                            <TableHead> Year </TableHead>
                                            <TableHead> Price </TableHead>
                                            <TableHead> Status </TableHead>
                                            <TableHead> Featured </TableHead>
                                            <TableHead className="text-right"> Actions </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            carsData.data.map((car) => (
                                                <TableRow key={car.id}>
                                                    <TableCell>
                                                        <div className="w-10 h-10 rounded-md overflow-hidden">
                                                            {
                                                                car.images && car.images.length > 0 ? (
                                                                    <Image
                                                                        src={car.images[0]}
                                                                        alt={`${car.make} ${car.model}`}
                                                                        height={40}
                                                                        width={40}
                                                                        className="w-full h-full object-cover"
                                                                        priority
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                        <CarIcon className="h-6 w-6 text-gray-400" />
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-medium">{car.make} {car.model}</TableCell>
                                                    <TableCell>{car.year}</TableCell>
                                                    <TableCell>{formatCurrency(car.price)}</TableCell>
                                                    <TableCell>{getStatusBadge(car.status)}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="p-0 h-9 w-9"
                                                            onClick={() => handleToggleFeatured(car)}
                                                            disabled={updatingCar}
                                                        >
                                                            {
                                                                car.featured ? (
                                                                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                                                                ) : (
                                                                    <StarOff className="h-5 w-5 text-gray-400" />
                                                                )
                                                            }
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu 
                                                            open={openDropdownId === car.id}
                                                            onOpenChange={(open) => setOpenDropdownId(open ? car.id : null)}
                                                        >
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="p-0 h-8 w-8"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel> Actions </DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={() => handleViewCar(car.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" /> View </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuLabel> Status </DropdownMenuLabel>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(car, "AVAILABLE")}
                                                                    disabled={car.status === "AVAILABLE" || updatingCar}
                                                                > Set Available </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(car, "UNAVAILABLE")}
                                                                    disabled={car.status === "UNAVAILABLE" || updatingCar}
                                                                > Set Unavailable </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(car, "SOLD")}
                                                                    disabled={car.status === "SOLD" || updatingCar}
                                                                > Mark as Sold </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    className="text-red-600"
                                                                    onClick={() => handleDeleteOptionClick(car)}
                                                                ><Trash2 className="mr-2 h-4 w-4" /> Delete </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                <CarIcon className="h-12 w-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-1"> No cars found </h3>
                                <p className="text-gray-500 mb-4">
                                    {
                                        search ? "No cars match your search criteria" : "Your inventory is empty. Add cars to get started."
                                    }
                                </p>
                                <Button onClick={() => router.push("/admin/cars/create")}> Add Your First Car </Button>
                            </div>
                        )
                    }
                </CardContent>
            </Card>
            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle> Confirm Deletion </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {carToDelete?.make}{" "}
                            {carToDelete?.model} ({carToDelete?.year})? This action cannot be
                            undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={deletingCar}
                        > Cancel </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteCar}
                            disabled={deletingCar}
                        >
                            {
                                deletingCar ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : ("Delete Car")
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default CarsList;

