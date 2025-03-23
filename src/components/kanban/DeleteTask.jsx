import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useTaskStore } from "../../stores/task.store";
import { useShallow } from "zustand/react/shallow";

const DeleteTask = ({data ,close}) => {
     const { loading, deleteTask,getAll } = useTaskStore(useShallow((state) => state));
        
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) =>
        value !== "DELETE-TASK"
          ? "Enter DELETE-TASK to delete the task."
          : null,
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const res = await deleteTask(data?.id)
    if(res){
        form.reset()
        await getAll()
        close()

    }
  };
  return (
    <div>
      <p className="text-center text-slate-500 text-lg mb-2">
        Are you sure? you want to delete the task. This action can't be undone.
      </p>
      <form className="flex flex-col gap-4" onSubmit={form.onSubmit(handleSubmit)}>
        <p>
          Type <b>DELETE-TASK</b> to delete the task
        </p>
        <TextInput
          placeholder="DELETE-TASK"
          variant="filled"
          size="lg"
          {...form.getInputProps("title")}
        />
        <div className="flex justify-end">
          <Button loading={loading} type="submit" color="red" size="lg">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeleteTask;
