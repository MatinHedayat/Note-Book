'use client';

import Modal from '../Modal';
import { deleteCategory } from '@/actions/category';
import { deleteCategoryToastInfo } from '@/data/toastInfo';

import { useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoAddCircleSharp } from 'react-icons/io5';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

import { useToast } from '@/components/ui/use-toast';
import EditCategory from '../EditCategory';
import { initialStateOfCategories } from '@/data/initialState';
import AddCategory from '../AddCategory';

type CategoriesProps = {
  categories: CategoryType[];
};

export default function Categories({ categories }: CategoriesProps) {
  const [categoryItem, setCategoryItem] = useState<CategoryType>(initialStateOfCategories);

  const { toast } = useToast();
  const [dialogIsOpen, setDialogOpen] = useState(false);

  async function handleDeleteCategory(categoryId: string) {
    const response = await deleteCategory(categoryId);
    if (response) {
      toast({ title: response?.message, description: response?.desc });
      return;
    }

    toast({ title: deleteCategoryToastInfo?.message });
  }

  return (
    <div className='px-12 select-none'>
      {categories.length ? (
        <Carousel>
          <CarouselContent>
            {categories.map((item, index: number) => (
              <CarouselItem key={item.id} className='sm:basis-1/2 lg:basis-1/3'>
                <div className='w-full text-sm space-y-4 p-3 border border-zinc-600 rounded-md sm:p-4'>
                  <div className='flex-between'>
                    <span className='bg-zinc-800 text-zinc-300 w-8 block text-[0.7rem] font-medium text-center py-0.5 rounded'>
                      {index + 1}
                    </span>

                    <div className='flex items-center gap-x-2 bg-transparent'>
                      {/* Edit */}
                      <Dialog open={dialogIsOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger
                          className='bg-zinc-800 px-2 py-1 rounded'
                          onClick={() => setCategoryItem(item)}
                        >
                          <FiEdit />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>
                              You can change the name of the category or delete all the notes inside
                              it
                            </DialogDescription>
                          </DialogHeader>

                          <EditCategory item={categoryItem} setDialogOpen={setDialogOpen} />
                        </DialogContent>
                      </Dialog>

                      {/* Delete */}
                      <Modal
                        textIcon={<RiDeleteBin6Line />}
                        modalTitle='Are you sure you want to delete this category ?'
                        modalDesc='This action cannot be reversed. Your category will be deleted with all the notes inside it'
                        action={() => handleDeleteCategory(item.id)}
                        className='bg-zinc-800 px-2 py-1 rounded'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <p className='flex-between gap-x-2'>
                      <span>Category :</span>
                      <span className='max-w-28 text-zinc-300 text-[0.8rem] font-medium capitalize truncate text-center px-2 py-0.5 border border-zinc-700 rounded'>
                        {item.category}
                      </span>
                    </p>

                    <p className='flex-between gap-x-2'>
                      <span className='text-[0.75rem]'>Number of notes :</span>
                      <span className='w-8 text-zinc-300 text-[0.8rem] capitalize text-center py-0.5 border border-zinc-700 rounded'>
                        {item.notes.length}
                      </span>
                    </p>
                  </div>

                  <div className='text-[0.8rem] space-y-1'>
                    <p className='flex-between gap-x-2'>
                      <span>Created at :</span>
                      <span className='bg-zinc-800 text-zinc-300 text-[0.7rem] capitalize px-2 py-0.5 rounded'>
                        {new Date(item.createdAt).toDateString()}
                      </span>
                    </p>

                    <p className='flex-between gap-x-2'>
                      <span>Last update :</span>
                      <span className='bg-zinc-800 text-zinc-300 text-[0.7rem] capitalize px-2 py-0.5 rounded'>
                        {new Date(item.updatedAt).toDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className='flex flex-col items-center gap-y-4'>
          <p className='text-sm text-zinc-300'>You have no categories ...</p>

          <AddCategory triggerMode='normal' />
        </div>
      )}
    </div>
  );
}
