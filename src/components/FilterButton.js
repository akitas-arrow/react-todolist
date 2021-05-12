import React from 'react'
import styled from 'styled-components'
import {Color} from './shared/style'

const FilterButton = ({name}) => {

    return (
    <Option value={name}>{name}</Option>
    )
}

const Option = styled.option`
    color: ${Color.text};
    background-color: ${Color.white};
`

export default FilterButton