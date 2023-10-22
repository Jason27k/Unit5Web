import React from 'react'
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"

const BreweryMenu = ({ breweryTypes, handleTypeChange, className }) => {
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