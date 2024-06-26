'use client'

import {
    Badge,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Tooltip,
} from '@nextui-org/react'
import React, { Key } from 'react'
import { BasicForReview } from './types'
import { generateCellName } from './generateCellName'
import { useDataContext } from '../context/useDataContext'
import { CellBasicType } from '../context/types'
import { SplitIcon } from './SplitIcon'
import { DeleteIcon } from './DeleteIcon'

type Props = CellBasicType & {
    value: BasicForReview
}

export function CustomCell({ value, id, fieldName }: Props) {
    const { nextForReview, markAsReviewed, splitRows } = useDataContext()

    const name = generateCellName({ id, fieldName })
    const isCellNextForReview = nextForReview === name

    const handleSelect = (key: 'all' | Set<Key>) => {
        // Need to have this hack because of open discussion regarding component API design https://github.com/adobe/react-spectrum/issues/5606
        if (key !== 'all') {
            const newValue = key.values().next().value

            if (newValue === 'split') {
                // On split click we keep values for current row as it is and create additional rows for values from value.forReview
                splitRows({ id, fieldName })
                return
            }

            if (newValue === 'skip') {
                // On skip click we keep value for current row as it is and reset value.forReview
                markAsReviewed({ id, fieldName, newValue: value.value })
                return
            }

            markAsReviewed({ id, fieldName, newValue })
        }
    }

    return (
        <div className="h-12 flex items-center">
            {isCellNextForReview ? (
                <Dropdown backdrop="blur">
                    <Tooltip content="There are alternative values for review" color="warning">
                        <Badge content="" color="warning" shape="circle" placement="top-right">
                            <DropdownTrigger>
                                <Button variant="bordered">{value.value}</Button>
                            </DropdownTrigger>
                        </Badge>
                    </Tooltip>

                    <DropdownMenu
                        aria-label="Static Actions"
                        variant="faded"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={value.value}
                        onSelectionChange={handleSelect}
                    >
                        <DropdownSection
                            title="Unreviewed values (select one or split)"
                            showDivider
                        >
                            {value.forReview.map((el) => (
                                <DropdownItem key={el}>{el}</DropdownItem>
                            ))}
                        </DropdownSection>
                        <DropdownSection showDivider>
                            <DropdownItem
                                key="split"
                                startContent={<SplitIcon />}
                                description="Split all values to its own row"
                            >
                                Split
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                            <DropdownItem
                                key="skip"
                                color="danger"
                                className="text-danger"
                                startContent={<DeleteIcon />}
                                description="Skip review for current cell"
                            >
                                Skip
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <div className="p-2">{value.value}</div>
            )}
        </div>
    )
}
