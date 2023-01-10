import { ReactElement } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as S from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { Button } from './button';

type SelectProps = {
  options: { disabled?: boolean; key: string; name: string }[];
  defaultValue?: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder: string;
};

export const Select = ({
  options,
  defaultValue,
  onChange,
  placeholder,
}: SelectProps): ReactElement => {
  return (
    <S.Root defaultValue={defaultValue} onValueChange={onChange}>
      <S.Trigger asChild aria-label={placeholder}>
        <Button>
          <S.Value placeholder={placeholder} />
          <S.Icon className="ml-2">
            <ChevronDownIcon />
          </S.Icon>
        </Button>
      </S.Trigger>
      <S.Content>
        <S.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronUpIcon />
        </S.ScrollUpButton>
        <S.Viewport className="rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
          <S.Group>
            {options.map(option => (
              <S.Item
                disabled={option.disabled}
                key={option.key}
                value={option.key}
                className={clsx(
                  'relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-gray-700 focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-gray-900',
                  'radix-disabled:opacity-50',
                  'select-none focus:outline-none',
                )}
              >
                <S.ItemText>{option.name}</S.ItemText>
                <S.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </S.ItemIndicator>
              </S.Item>
            ))}
          </S.Group>
        </S.Viewport>
        <S.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronDownIcon />
        </S.ScrollDownButton>
      </S.Content>
    </S.Root>
  );
};
