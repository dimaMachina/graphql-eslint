import { forwardRef } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  SelectItemProps,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import { clsx } from 'clsx';

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Item className={clsx('SelectItem', className)} {...props} ref={forwardedRef}>
        <ItemText>{children}</ItemText>
        <ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </ItemIndicator>
      </Item>
    );
  },
);
SelectItem.displayName = 'SelectItem';

export function Select() {
  return (
    <Root>
      <Trigger className="SelectTrigger" aria-label="Food">
        <Value placeholder="Select a fruit…" />
        <Icon className="SelectIcon">
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Portal>
        <Content className="SelectContent">
          <ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </ScrollUpButton>
          <Viewport className="SelectViewport">
            <Group>
              <Label className="SelectLabel">Fruits</Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </Group>

            <Separator className="SelectSeparator" />

            <Group>
              <Label className="SelectLabel">Vegetables</Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">leek</SelectItem>
            </Group>

            <Separator className="SelectSeparator" />

            <Group>
              <Label className="SelectLabel">Meat</Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </Group>
          </Viewport>
          <ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  );
}
