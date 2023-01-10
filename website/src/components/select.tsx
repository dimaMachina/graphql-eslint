import { ReactElement } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as S from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { Button } from './button';

type Props = {};

export const Select = (props: Props): ReactElement => {
  return (
    <S.Root defaultValue="blueberry">
      <S.Trigger asChild aria-label="Food">
        <Button>
          <S.Value />
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
            {['Apple', 'Banana', 'Blueberry', 'Strawberry', 'Grapes'].map((f, i) => (
              <S.Item
                disabled={f === 'Grapes'}
                key={`${f}-${i}`}
                value={f.toLowerCase()}
                className={clsx(
                  'relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-gray-700 focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-gray-900',
                  'radix-disabled:opacity-50',
                  'select-none focus:outline-none',
                )}
              >
                <S.ItemText>{f}</S.ItemText>
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
