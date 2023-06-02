"use client";
import { getUrl } from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) {
  const { deleteTask } = useBoardStore((state) => state);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const fetchImage = async () => {
    const url = await getUrl(todo.image!);
    if (url) {
      setImageUrl(url.toString());
    }
  };

  useEffect(() => {
    if (todo.image) {
      fetchImage();
    }
  }, [todo]);

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-6 w-8" />
        </button>
      </div>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={400}
          height={200}
          alt="task image"
          className="w-full object-contain rounded-b-md"
        />
      )}
    </div>
  );
}

export default TodoCard;
