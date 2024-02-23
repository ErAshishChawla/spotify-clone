"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import FormSubmitButton from "../form-submit-button";

import { uploadSong } from "@/actions/uploadSong";

import { useUserStore } from "@/providers/user-store-provider";
import { useUploadSongModalStore } from "@/stores/useUploadSongModalStore";

export default function UploadSongModal() {
  // Upload Modal Store to open and close the modal
  const uploadSongModalStore = useUploadSongModalStore();

  // User Store to check if user is logged in and access user data
  const { isLoggedIn, userData } = useUserStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userData: state.userData,
  }));

  // Form state to handle the upload song form
  const [formState, uploadSongAction] = useFormState(uploadSong, {
    status: "idle",
    errors: {},
  });

  // Router to refresh the page after song upload
  const router = useRouter();

  // Check if user is not logged in and close the modal
  useEffect(() => {
    if (uploadSongModalStore.isOpen && !isLoggedIn) {
      toast.error("You must be logged in to upload a song.");
      uploadSongModalStore.onClose();
    }
  }, [isLoggedIn, uploadSongModalStore.isOpen]);

  // Check if the form state is success or error and show the toast message
  useEffect(() => {
    if (!uploadSongModalStore.isOpen) {
      return;
    }

    if (formState.status === "success") {
      toast.success(formState.successMessage);
      setTimeout(() => {
        uploadSongModalStore.onClose();
        // mutate(`user-songs/${userData?.id}`); // To update the user songs list
        // router.refresh(); // Refresh the page to show the new song as the action revalidates the current page
      }, 500);
      formState.status = "idle";
      return;
    }

    if (formState.status === "error") {
      toast.error(formState.errors._form?.join(", "));
      formState.status = "idle";
      return;
    }
  }, [formState, router, uploadSongModalStore.isOpen]);

  return (
    <>
      <Modal
        isOpen={uploadSongModalStore.isOpen}
        onOpenChange={uploadSongModalStore.onOpenChange}
        isDismissable={false}
        backdrop="opaque"
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Song
              </ModalHeader>
              <ModalBody>
                <form
                  action={uploadSongAction}
                  className="flex flex-col flex-1 gap-4"
                >
                  <Input
                    name="songTitle"
                    required
                    label="Song Title"
                    labelPlacement="outside"
                    placeholder="Enter song title"
                    isInvalid={!!formState.errors.songTitle}
                    errorMessage={formState.errors.songTitle?.join(", ")}
                    isRequired
                  />
                  <Input
                    name="songAuthor"
                    required
                    label="Author"
                    labelPlacement="outside"
                    placeholder="Enter song author"
                    isInvalid={!!formState.errors.songAuthor}
                    errorMessage={formState.errors.songAuthor?.join(", ")}
                    isRequired
                  />
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-sm">
                      Song File{" "}
                      <span className="after:content-['*'] after:text-red-500 text-xs text-gray-300">
                        {"(.mp3)"}
                      </span>
                    </p>
                    <input name="songFile" required type="file" accept=".mp3" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-sm">
                      Song Image{" "}
                      <span className="after:content-['*'] after:text-red-500 text-xs text-gray-300">
                        {"(.jpg, .png, .jpeg)"}
                      </span>
                    </p>
                    <input
                      name="songImage"
                      required
                      type="file"
                      accept="image/*"
                    />
                  </div>

                  {formState.errors._form ? (
                    <p className="text-sm bg-red-600 text-white p-2 border border-red-400 rounded-md w-full">
                      {formState.errors._form.join(", ")}
                    </p>
                  ) : null}

                  <FormSubmitButton color="primary">
                    Upload Song
                  </FormSubmitButton>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  className="flex-1"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
