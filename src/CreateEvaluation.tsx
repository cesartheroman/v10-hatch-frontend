import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Input, Box, Label, Button, HelpText } from "@twilio-paste/core";
import axios from "axios";
import {
  useComboboxPrimitive,
  useMultiSelectPrimitive,
  useFormPillState,
  ComboboxListbox,
  ComboboxListboxGroup,
  FormPill,
  FormPillGroup,
  ComboboxListboxOption,
  Option,
  Select,
} from "@twilio-paste/core";
import { useUIDSeed } from "react-uid";


// TODO: Role check logic
// TODO: Update Nav Bar

const CreateEvaluation = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<Array<string>>([]);
  //   const [items, setItems] = useState<Array<string>>([
  //     "Ryder",
  //     "Elias",
  //     "Paola",
  //   ]);
  const items = ["ryder", "paola", "elias", "cesar", "zero", "nicky"];
  const [selectedApprentice, setApprentice] = useState<string>("");
  const [filteredItems, setFilteredItems] = React.useState<Array<string>>([
    ...items,
  ]);

  const seed = useUIDSeed();
  const formPillState = useFormPillState();
  const inputId = seed("input-element");

  // TODO: GET apprentice assigned api/v1/users/managers/id/apprentices

  useEffect(() => {
    // TODO: GET all questions /api/v1/questions/
    // TODO: GET all reviewers /api/v1/users/reviewers
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    // TODO: POST eval api/v1/evalutations
    //       on post have confirm modal or redirect
    // selected reviews array are stored in selectedItems
  };

  const handleChange = () => {
    console.log("change handled 0_0");
  };

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultiSelectPrimitive({});

  const handleSelectItemOnClick = React.useCallback(
    (selectedItem) => {
      addSelectedItem(selectedItem);

      setFilteredItems((currentFilteredItems) =>
        currentFilteredItems.filter((item) => item !== selectedItem)
      );
    },
    [addSelectedItem, setFilteredItems]
  );

  const handleRemoveItemOnClick = React.useCallback(
    (selectedItem) => {
      removeSelectedItem(selectedItem);

      setFilteredItems((currentFilteredItems) =>
        [...currentFilteredItems, selectedItem].sort()
      );
    },
    [removeSelectedItem]
  );

  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    isOpen,
    selectedItem,
    selectItem,
  } = useComboboxPrimitive({
    items: filteredItems,
    initialInputValue: "",
    onSelectedItemChange: ({ selectedItem: selected }) => {
      if (selected != null) {
        handleSelectItemOnClick(selected);
      }
      //   selectItem(null);
    },
  });

  return (
    <Box margin="space100" padding="space100">
      <Card>
        <h2>New Evaluation</h2>
        <Box marginBottom="space80">
          <Label htmlFor="email_address" required>
            Title
          </Label>
          <Input
            aria-describedby="title_help_text"
            id="title"
            name="title"
            type="text"
            placeholder="Hatch Eval #1"
            onChange={handleChange}
            required
          />
        </Box>
        {/* <HelpText id="email_help_text">Ev</HelpText> */}
        {/* TODO: Select Apprentice */}
        <Label htmlFor="apprentice_select">Select Apprentice</Label>
        <Box marginBottom="space80">
          <Select
            id="apprentice_select"
            onChange={(e) => setApprentice(e.target.value)}
            required
          >
            {/* TODO: map apprentice array*/}
            <Option value="Elias">Elias</Option>
            <Option value="Ryder">Ryder</Option>
            <Option value="Cesar">Cesar</Option>
            <Option value="Paola">Paola</Option>
          </Select>
        </Box>
        {/* TODO: Question Selection */}

        <>
          <Box marginBottom="space40" position="relative">
            {/* TODO: Select Reviewers */}
            <Label htmlFor={inputId} {...getLabelProps()}>
              Choose a Reviewer
            </Label>
            <Box {...getComboboxProps({ role: "combobox" })}>
              <Input
                id={inputId}
                type="text"
                {...getInputProps({
                  ...getDropdownProps({
                    preventKeyAction: isOpen,
                    ...getToggleButtonProps({ tabIndex: 0 }),
                  }),
                })}
                value={selectedItem || ""}
              />
            </Box>
            <ComboboxListbox hidden={!isOpen} {...getMenuProps()}>
              <ComboboxListboxGroup>
                {filteredItems.map((filteredItem, index) => (
                  <ComboboxListboxOption
                    highlighted={highlightedIndex === index}
                    variant="default"
                    {...getItemProps({
                      item: filteredItem,
                      index,
                      key: seed("filtered-item-" + filteredItem),
                    })}
                  >
                    {filteredItem}
                  </ComboboxListboxOption>
                ))}
              </ComboboxListboxGroup>
            </ComboboxListbox>
          </Box>
          <FormPillGroup {...formPillState} aria-label="Selected components">
            {selectedItems.map((item, index) => {
              return (
                <FormPill
                  {...getSelectedItemProps({
                    selectedItem,
                    index,
                    key: "selected-item-" + item,
                  })}
                  tabIndex={null}
                  {...formPillState}
                  onDismiss={() => handleRemoveItemOnClick(item)}
                >
                  {item}
                </FormPill>
              );
            })}
          </FormPillGroup>
          {/* TODO: Submit button*/}
        </>
      </Card>

    </Box>
  );
};

export default CreateEvaluation;
