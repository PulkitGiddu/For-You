import { useState } from "react";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  listAll, 
  deleteObject 
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

export interface PhotoItem {
  id: string;
  url: string;
  name: string;
  caption?: string;
  uploadTime: number;
}

export function useFirebaseStorage() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  /**
   * Upload a photo to Firebase Storage.
   * @param file - The file to upload.
   * @param caption - Optional caption for the photo.
   */
  const uploadPhoto = async (file: File, caption: string = "") => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);
    
    try {
      // Create a unique filename with timestamp
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `photos/${fileName}`);
      
      // Upload the file
      const uploadResult = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      // Create a new photo item
      const newPhoto: PhotoItem = {
        id: fileName,
        url: downloadURL,
        name: file.name,
        caption: caption,
        uploadTime: timestamp
      };
      
      // Add the new photo to the state
      setPhotos(prev => [newPhoto, ...prev]);
      
      toast({
        title: "Upload successful",
        description: "Your photo has been uploaded!"
      });
      
      return newPhoto;
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your photo.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
      setProgress(100);
    }
  };

  /**
   * Fetch all photos from Firebase Storage.
   */
  const fetchPhotos = async () => {
    setIsLoading(true);
    try {
      const photosRef = ref(storage, "photos");
      const photosList = await listAll(photosRef);
      
      const photoDetails = await Promise.all(
        photosList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const name = item.name.substring(item.name.indexOf("_") + 1);
          const uploadTime = parseInt(item.name.split("_")[0], 10);
          
          return {
            id: item.name,
            url,
            name,
            uploadTime
          } as PhotoItem;
        })
      );
      
      // Sort by upload time (newest first)
      photoDetails.sort((a, b) => b.uploadTime - a.uploadTime);
      setPhotos(photoDetails);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast({
        title: "Couldn't load photos",
        description: "There was a problem loading your photos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a photo from Firebase Storage.
   * @param photoId - The ID of the photo to delete.
   */
  const deletePhoto = async (photoId: string) => {
    try {
      const photoRef = ref(storage, `photos/${photoId}`);
      await deleteObject(photoRef);
      
      // Remove the photo from the state
      setPhotos(prev => prev.filter(photo => photo.id !== photoId));
      
      toast({
        title: "Photo deleted",
        description: "The photo has been removed.",
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast({
        title: "Delete failed",
        description: "There was a problem deleting the photo.",
        variant: "destructive"
      });
    }
  };

  return { 
    photos, 
    isLoading, 
    isUploading, 
    progress, 
    uploadPhoto, 
    fetchPhotos, 
    deletePhoto 
  };
}