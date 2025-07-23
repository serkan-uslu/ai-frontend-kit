"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Send, Upload, Edit, FileText } from "lucide-react";
import { useState, useRef } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onImageGenerate?: (message: string) => void;
  onImageEdit?: (message: string, imageData: string, mimeType: string) => void;
  onImageCaption?: (
    imageData: string,
    mimeType: string,
    message?: string,
  ) => void;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}

export function ChatInput({
  onSend,
  onImageGenerate,
  onImageEdit,
  onImageCaption,
  disabled = false,
  isLoading = false,
  placeholder = "Type a message...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isLoading) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageEditClick = () => {
    if (!selectedImage || !message.trim() || !onImageEdit) return;

    // Use the image preview which is already in base64 format
    if (imagePreview) {
      onImageEdit(message.trim(), imagePreview, selectedImage.type);
      setMessage("");
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const handleImageCaptionClick = () => {
    if (!selectedImage || !onImageCaption) return;

    // Use the image preview which is already in base64 format
    if (imagePreview) {
      // Pass optional message if provided
      onImageCaption(
        imagePreview,
        selectedImage.type,
        message.trim() || undefined,
      );
      setMessage("");
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-2 sm:p-4 border-t bg-background"
    >
      {/* Image preview area */}
      {imagePreview && (
        <div className="relative w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Image to edit:</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSelectedImage}
              className="h-6 px-2"
            >
              Remove
            </Button>
          </div>
          <img
            src={imagePreview}
            alt="Selected image"
            className="max-h-32 max-w-full rounded-md object-contain mx-auto"
          />
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            imagePreview ? "Describe how to edit the image..." : placeholder
          }
          disabled={disabled} // Only disable if the model is not available
          className="flex-1 min-h-[44px] text-sm sm:text-base resize-none"
          autoComplete="off"
        />
        <div className="flex gap-2">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
            id="image-upload"
          />

          {/* Upload image button */}
          {(onImageEdit || onImageCaption) && !imagePreview && (
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isLoading}
              size="icon"
              variant="outline"
              className="min-w-[44px] h-[44px] flex-shrink-0 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-800/30 border-purple-200 dark:border-purple-800"
              title="Upload image to edit or caption"
            >
              <Upload className="w-4 h-4" />
              <span className="sr-only">Upload image</span>
            </Button>
          )}

          {/* Edit image button */}
          {onImageEdit && imagePreview && message.trim() && (
            <Button
              type="button"
              onClick={handleImageEditClick}
              disabled={disabled || isLoading || !message.trim()}
              size="icon"
              variant="outline"
              className="min-w-[44px] h-[44px] flex-shrink-0 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-800/30 border-purple-200 dark:border-purple-800"
              title="Edit image with AI"
            >
              <Edit className="w-4 h-4" />
              <span className="sr-only">Edit image</span>
            </Button>
          )}

          {/* Caption image button */}
          {onImageCaption && imagePreview && (
            <Button
              type="button"
              onClick={handleImageCaptionClick}
              disabled={disabled || isLoading}
              size="icon"
              variant="outline"
              className="min-w-[44px] h-[44px] flex-shrink-0 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/20 dark:hover:bg-teal-800/30 border-teal-200 dark:border-teal-800"
              title="Caption image with AI"
            >
              <FileText className="w-4 h-4" />
              <span className="sr-only">Caption image</span>
            </Button>
          )}

          {/* Generate image button */}
          {onImageGenerate && !imagePreview && (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (message.trim() && !disabled && !isLoading) {
                  onImageGenerate(message.trim());
                  setMessage("");
                }
              }}
              disabled={disabled || isLoading || !message.trim()}
              size="icon"
              variant="outline"
              className="min-w-[44px] h-[44px] flex-shrink-0 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-800/30 border-blue-200 dark:border-blue-800"
              title="Generate image"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="sr-only">Generate image</span>
            </Button>
          )}

          {/* Send message button */}
          <Button
            type="submit"
            disabled={disabled || isLoading || !message.trim()}
            size="icon"
            className="min-w-[44px] h-[44px] flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
