import React from 'react'
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"

const BreweryMenu = ({ breweryTypes, handleTypeChange, className }) => {
  console.log(breweryTypes)
  console.log(breweryTypes.length)
  return (
    <div className={`inline-block ${className}`}>
        <Menubar>
            {breweryTypes.map((type, _) => (
                <MenubarMenu key={type}>
                    <MenubarTrigger onClick={() => handleTypeChange(type)}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenubarTrigger>
                </MenubarMenu>
            ))}
        </Menubar>
    </div>
  )
}

export default BreweryMenu