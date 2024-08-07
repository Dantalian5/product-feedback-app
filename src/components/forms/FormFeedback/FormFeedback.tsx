"use client";
import React from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ZodError } from "zod";

import {
  addFeedback,
  editFeedback,
  deleteFeedback,
} from "@/services/actions/feedbackActions";
import DropDown from "@/components/common/DropDown";
import CustomLabel from "@/components/common/CustomLabel";
import Button from "@/components/common/Button";
import TextArea from "@/components/common/TextArea";
import Input from "@/components/common/Input";
import { svgAddIcon, svgEditIcon } from "@/utils/svgIcons";
import { feedbackSchema } from "@/schemas/feedbackSchema";
import type { NewFeedback, Feedback } from "@/types/global";

interface FormFeedbackProps {
  oldFeedback?: Feedback;
}
const FormFeedback = ({ oldFeedback }: FormFeedbackProps) => {
  const router = useRouter();
  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusArray = ["suggestion", "planned", "in-progress", "live"];

  const [formData, setFormData] = React.useState(
    oldFeedback || {
      title: "",
      category: categories[0],
      status: statusArray[0],
      description: "",
    },
  );
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      feedbackSchema.parse(formData);
      if (!oldFeedback) {
        await addFeedback(formData as NewFeedback);
        toast.success(`Feedback added successfully`);
        router.push("/");
      } else {
        await editFeedback(formData as Feedback);
        toast.success(`Feedback edited successfully`);
        router.refresh();
      }
    } catch (error: any) {
      if (error instanceof ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error("Oops, something went wrong. Try again later");
      }
    }
  };
  const handleDelete = async () => {
    if (!oldFeedback) return toast.error("Feedback not found");
    try {
      await deleteFeedback(oldFeedback.id);
      toast.success(`Feedback deleted successfully`);
      router.push("/");
    } catch (error) {
      toast.error("Ups, something whent wrong. Try again later");
    }
  };
  const handleCancel = () => {
    setFormData(
      oldFeedback || {
        title: "",
        category: categories[0],
        status: statusArray[0],
        description: "",
      },
    );
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
    errors.title && setErrors((prev) => ({ ...prev, title: "" }));
  };
  const handleDescriptionOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
    errors.description && setErrors((prev) => ({ ...prev, description: "" }));
  };

  return (
    <form
      id="newFeedback"
      onSubmit={handleSubmit}
      className="relative rounded-10 bg-white px-6 pb-6 pt-11 sm:px-10 sm:pb-10 sm:pt-[52px]"
    >
      <span className=" absolute left-6 top-0 -translate-y-1/2 text-3xl sm:left-[42px] sm:text-4xl">
        {oldFeedback ? svgEditIcon : svgAddIcon}
      </span>
      <p className="mb-10 text-lg font-bold tracking-tighter text-dark-700 sm:text-2xl ">
        {oldFeedback ? `Editing ‘${oldFeedback.title}’` : "Create New Feedback"}
      </p>
      <div className="mb-8 flex flex-col gap-y-6">
        <CustomLabel
          label="Feedback Title"
          description="Add a short, descriptive headline"
          htmlFor="inputTitle"
          error={errors.title}
        >
          <Input
            type="text"
            id="inputTitle"
            value={formData.title}
            onChange={handleTitleOnChange}
          />
        </CustomLabel>
        <CustomLabel
          label="Category"
          description="Choose a category for your feedback"
          htmlFor="inputCategory"
        >
          <DropDown
            id="inputCategory"
            options={categories}
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          />
        </CustomLabel>
        {oldFeedback && (
          <CustomLabel
            label="Update Status"
            description="Change feature state"
            htmlFor="inputStatus"
          >
            <DropDown
              id="inputStatus"
              options={statusArray}
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
            />
          </CustomLabel>
        )}
        <CustomLabel
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added, etc."
          htmlFor="inputDetails"
          error={errors.description}
        >
          <TextArea
            id="inputDetails"
            value={formData.description}
            onChange={handleDescriptionOnChange}
            rows={5}
          />
        </CustomLabel>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row-reverse">
        <Button classe="violet" type="submit" isFlex>
          {oldFeedback ? "Save Changes" : "Add Feedback"}
        </Button>
        <Button onClick={handleCancel} classe="dark" type="button" isFlex>
          Cancel
        </Button>
        {oldFeedback && (
          <div className="w-full">
            <Button classe="orange" type="button" isFlex onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default FormFeedback;
