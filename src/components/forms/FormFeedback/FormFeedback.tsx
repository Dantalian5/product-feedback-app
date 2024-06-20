"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addFeedback, editFeedback, deleteFeedback } from "@/services/api";
import DropDown from "@/components/common/DropDown";
import CustomLabel from "@/components/common/CustomLabel";
import Button from "@/components/common/Button";
import { svgAddIcon, svgEditIcon } from "@/utils/svgIcons";
import type {
  TypeFeedback,
  TypeFeedbackBase,
  TypeUser,
} from "@/types/dataTypes";

interface FormFeedbackProps {
  oldFeedback?: TypeFeedback;
  user: TypeUser;
}
const FormFeedback = (props: FormFeedbackProps) => {
  const router = useRouter();
  const { oldFeedback, user } = props;
  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusArray = ["suggestion", "planned", "in-progress", "live"];

  const [formData, setFormData] = React.useState<
    TypeFeedback | TypeFeedbackBase
  >(
    oldFeedback || {
      title: "",
      category: categories[0],
      status: statusArray[0],
      description: "",
      user_id: user.id,
    },
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!oldFeedback) {
        const result = await addFeedback(formData);
        toast.success(`Feedback added successfully`);
      } else {
        const result = await editFeedback(formData as TypeFeedback);
        toast.success(`Feedback edited successfully`);
      }
      router.refresh();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Ups, something whent wrong. Try again later");
    }
  };
  const handleDelete = async () => {
    if (!oldFeedback) return toast.error("Feedback not found");
    try {
      const result = await deleteFeedback(oldFeedback.id);
      toast.success(`Feedback deleted successfully`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting feedback:", error);
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
        user_id: user?.id,
      },
    );
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
        >
          <input
            type="text"
            id="inputTitle"
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
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
        >
          <textarea
            id="inputDetails"
            className="custom-form-focus block w-full rounded-5 bg-dark-200 p-4 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
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
