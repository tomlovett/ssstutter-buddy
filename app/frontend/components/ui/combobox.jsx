import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function ComboBox({
  defaultValue,
  valuesList,
  placeholder,
  disabled,
  onChange,
}) {
  const [open, setOpen] = useState(false)
  const [selectedPair, setSelectedPair] = useState({})

  useEffect(() => {
    if (defaultValue?.name) {
      setSelectedPair(defaultValue)
    }
  }, [defaultValue])

  const ItemRow = ({ item }) => {
    const checkOpacity =
      selectedPair?.symbol === item.symbol ? 'opacity-100' : 'opacity-0'

    return (
      <CommandItem
        key={item.symbol}
        value={item.symbol}
        onSelect={() => {
          console.log(
            'combobox -> item.symbol, selectedPair?.symbol:',
            item.symbol,
            !!selectedPair && selectedPair.symbol
          )
          // setSelectedPair(item.symbol === selectedPair?.symbol ? {} : item)
          setOpen(false)
          // .then(() => {
          console.log('selectedPair:', selectedPair)
          // onChange(item.symbol === selectedPair?.symbol ? {} : item)
          onChange(selectedPair)
          // })
        }}
      >
        <Check className={cn('mr-2 h-4 w-4', checkOpacity)} />
        {item.name}
      </CommandItem>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          {selectedPair.name || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No matches found.</CommandEmpty>
            <CommandGroup>
              {valuesList.length > 1 &&
                valuesList.map(item => <ItemRow item={item} key={item.name} />)}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
