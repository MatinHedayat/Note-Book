'use client';

import { useFiltersContext } from '@/contexts/Filters';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from './ui/label';

type FiltersProps = {
  categories: CategoryType[];
};

export default function Filters({ categories }: FiltersProps) {
  const { filters, setFilters } = useFiltersContext();
  const { category, sort, search, searchType } = filters;

  const categoryList = [
    { id: 'all-categories', category: 'all categories' },
    ...categories,
    { id: 'bookmarks', category: 'bookmarks' },
  ];

  const sortList = [
    { id: 1, sort: 'earliest' },
    { id: 2, sort: 'latest' },
  ];

  return (
    <div className='mb-4 md:mb-6'>
      <h3 className='title-small mb-2'>Filters :</h3>

      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='flex items-center gap-x-4 md:w-1/2'>
          <Input
            type='text'
            placeholder='Search something ...'
            className='w-2/3 h-10'
            value={search}
            onChange={(e: any) => setFilters({ ...filters, search: e.target.value })}
          />

          <div className='grid gap-y-1'>
            <p className='flex items-center gap-x-2'>
              <Checkbox
                id='title'
                checked={searchType.title}
                onCheckedChange={() =>
                  setFilters({
                    ...filters,
                    searchType: { ...searchType, title: !searchType.title },
                  })
                }
              />
              <Label htmlFor='title' className='text-[0.8rem]'>
                Title
              </Label>
            </p>

            <p className='flex items-center gap-x-2'>
              <Checkbox
                id='desc'
                checked={searchType.desc}
                onCheckedChange={() =>
                  setFilters({ ...filters, searchType: { ...searchType, desc: !searchType.desc } })
                }
              />
              <Label htmlFor='desc' className='text-[0.8rem]'>
                Description
              </Label>
            </p>
          </div>
        </div>

        <div className='flex gap-x-4 md:w-1/2 md:justify-end'>
          <Select
            defaultValue={category}
            onValueChange={(value) => {
              setFilters({ ...filters, category: value });
            }}
          >
            <SelectTrigger className='w-[180px] capitalize'>
              <SelectValue placeholder={category} />
            </SelectTrigger>
            <SelectContent>
              {categoryList.map((item) => (
                <SelectItem key={item.id} value={item.category} className='capitalize'>
                  {item.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            defaultValue={sort}
            onValueChange={(value) => {
              setFilters({ ...filters, sort: value });
            }}
          >
            <SelectTrigger className='w-[180px] capitalize'>
              <SelectValue placeholder={sort} />
            </SelectTrigger>
            <SelectContent>
              {sortList.map((item) => (
                <SelectItem key={item.id} value={item.sort} className='capitalize'>
                  {item.sort}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
