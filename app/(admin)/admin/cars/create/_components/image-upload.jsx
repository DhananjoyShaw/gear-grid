import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const ImageUpload = ({
    setUploadedAiImage,
    setImagePreview,
    setUploadedImages,
    setUploadProgress,
    setImageError,
}) => {

    // Handle AI image upload with Dropzone
    const onAiDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        setUploadedAiImage(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }, [setUploadedAiImage, setImagePreview]);

    const { getRootProps: getAiRootProps, getInputProps: getAiInputProps } =
        useDropzone({
            onDrop: onAiDrop,
            accept: {
                "image/*": [".jpeg", ".jpg", ".png", ".webp"],
            },
            maxFiles: 1,
            multiple: false,
        });

    // Handle multiple image uploads with Dropzone
    const onMultiImagesDrop = useCallback((acceptedFiles) => {
        const validFiles = acceptedFiles.filter((file) => {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} exceeds 5MB limit and will be skipped`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);

                // Process the images
                const newImages = [];
                validFiles.forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        newImages.push(e.target.result);

                        // When all images are processed
                        if (newImages.length === validFiles.length) {
                            setUploadedImages((prev) => [...prev, ...newImages]);
                            setUploadProgress(0);
                            setImageError("");
                            toast.success(
                                `Successfully uploaded ${validFiles.length} images`
                            );
                        }
                    };
                    reader.readAsDataURL(file);
                });
            }
        }, 200);
    }, [setUploadedImages, setUploadProgress, setImageError]);

    const {
        getRootProps: getMultiImageRootProps,
        getInputProps: getMultiImageInputProps,
    } = useDropzone({
        onDrop: onMultiImagesDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        multiple: true,
    });

    return {
        getAiRootProps,
        getAiInputProps,
        getMultiImageRootProps,
        getMultiImageInputProps,
    }
}

export default ImageUpload;