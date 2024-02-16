"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import FormSubmitButton from "./form-submit-button";

import { useUploadSongModalStore } from "@/stores/useUploadSongModalStore";
import { useFormState } from "react-dom";
import { uploadSong } from "@/actions/uploadSong";
import { toast } from "react-toastify";
import { paths } from "@/paths";

// interface UploadSongModalProps extends ModalProps {}

export default function UploadSongModal() {
  const uploadSongModalStore = useUploadSongModalStore();
  const router = useRouter();
  const supabase = createClient();
  const [formState, uploadSongAction] = useFormState(uploadSong, {
    status: "idle",
    errors: {},
  });

  useEffect(() => {
    async function shouldModalBeOpen() {
      const { error, data } = await supabase.auth.getUser();

      if (error || !data.user) {
        await supabase.auth.signOut();
        router.replace("/login");
      }
    }

    shouldModalBeOpen();
  }, [uploadSongModalStore.isOpen, router, supabase.auth]);

  useEffect(() => {
    if (formState.status === "success") {
      toast.success(formState.successMessage);
      setTimeout(() => {
        uploadSongModalStore.onClose();
        router.refresh();
      }, 2000);
    }

    if (formState.status === "error") {
      if (formState.errors._form) {
        formState.errors._form[0] === "You are not logged in." &&
          setTimeout(() => {
            router.replace(paths.login());
          });
      }
    }
  }, [
    formState.status,
    formState.errors._form,
    router,
    uploadSongModalStore,
    formState.successMessage,
  ]);

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