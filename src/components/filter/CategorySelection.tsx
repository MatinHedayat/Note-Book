'use client';

import { useFiltersContext } from '@/contexts/Filters';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CategoryType = {
  id: Date;
  category: string;
  notes: {}[];
  createdAt: Date;
  updatedAt: Date;
};

export default function CategorySelection({ categories }: { categories: CategoryType[] }) {
  const { filters, setFilters } = useFiltersContext();

  return (
    <Select
      onValueChange={(value) => {
        setFilters({ ...filters, category: value });
      }}
      defaultValue={filters.category}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={filters.category} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((item, index: number) => (
          <SelectItem key={index} value={item.category} className='capitalize'>
            {item.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
