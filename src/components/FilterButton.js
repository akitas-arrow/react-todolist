import React from 'react'

const FilterButton = ({name}) => {

    return (
    <option value={name}>{name}</option>
    )
}

export default FilterButton