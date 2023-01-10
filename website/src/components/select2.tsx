import { Fragment, ReactElement } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@theguild/components';
import clsx from 'clsx';

export type SelectOption = {
  key: string;
  name: ReactElement | string;
};

export type SelectProps = {
  selected: SelectOption;
  onChange: (option: SelectOption) => void;
  options: SelectOption[];
};

export function Select2({ options, selected, onChange }: SelectProps): ReactElement {
  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={clsx(
              'relative h-7 w-full cursor-default rounded-md px-2 text-left text-xs font-medium text-gray-600 transition-colors focus:outline-none dark:text-gray-400',
              open
                ? 'dark:bg-primary-100/10 bg-gray-200 text-gray-900 dark:text-gray-50'
                : 'dark:hover:bg-primary-100/5 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-50',
            )}
          >
            {selected.name}
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="bottom-[130%] z-20 mt-1 max-h-64 min-w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-neutral-800 dark:ring-white/20">
              {options.map(option => (
                <Listbox.Option
                  key={option.key}
                  value={option}
                  className={({ active }) =>
                    clsx(
                      active
                        ? 'bg-primary-50 text-primary-500 dark:bg-primary-500/10'
                        : 'text-gray-800 dark:text-gray-100',
                      'relative cursor-default select-none whitespace-nowrap py-1.5 pl-3 pr-9',
                    )
                  }
                >
                  {option.name}
                  {option.key === selected.key && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <CheckIcon />
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}
