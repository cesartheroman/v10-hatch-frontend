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

type Question = {
  id: number;
  question: string;
};

const styles = {
  submitButton: {
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "end",
    gap: 10,
  },
};

const CreateEvaluation = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 999, question: "what?" },
  ]);
  const [reviewerList, setReviewerList] = useState<Array<string>>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Array<string>>([]);
  const items = ["ryder", "paola", "elias", "cesar", "hacker"];
  const apprentices = ["EM apprentice", "HM app 1", "HM app 2"];
  const [selectedApprentice, setApprentice] = useState<string>("");
  const [filteredItems, setFilteredItems] = React.useState<Array<string>>([
    ...items,
  ]);

  const baseURL: string = "http://localhost:3000";
  const seed = useUIDSeed();
  const formPillState = useFormPillState();
  const inputId = seed("input-element");

  // TODO: GET apprentice assigned api/v1/users/managers/id/apprentices

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedQuestions((prev) => [...prev, value]);
    } else {
      setSelectedQuestions((prev) => prev.filter((x) => x !== value));
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = () => {
    axios.get(baseURL + "/questions").then((res) => {
      let newQuestions = res.data;
      setQuestions(newQuestions);
    });
  };

  const getReviewers = () => {
    axios.get(baseURL + "/api/v1/users/reviewers").then((res) => {
      let newReviewers = res.data;
      setQuestions(newReviewers);
    });
  };

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
    <Box marginBottom="space10" marginTop="space10" padding="space100">
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
        <Label htmlFor="apprentice_select">Select Apprentice</Label>
        <Box marginBottom="space80">
          <Select
            id="apprentice_select"
            onChange={(e) => setApprentice(e.target.value)}
            required
          >
            {apprentices.map((apprentice, i: any) => {
              return (
                <Option value={apprentice} id={i}>
                  {apprentice}
                </Option>
              );
            })}
          </Select>
        </Box>

        <Box padding={"space100"} marginBottom="space80">
          <div>
            <h2>Select questions to appear on evaluation</h2>
            {questions.map((question, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  name="selected-questions"
                  value={question.question}
                  onChange={handleChecked}
                />{" "}
                {question.question}
                <br />
              </label>
            ))}
          </div>
        </Box>
        <>
          <Box marginBottom="space40" position="relative">
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
        </>
        <Box justifyContent="end">
          <Button size="default" type="submit" variant="primary">
            {/* TODO: Handle Submit*/}
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CreateEvaluation;

//------------------- Paste Checkbox if there is time I want to revisit -------------
{
  /* <CheckboxGroup
            name="questions_group"
            legend="Select the answers to appear on the evaluation."
            // onChange={handleQuestions}
          >
            {questions.map((obj) => (
              <Checkbox
                name={obj.question}
                id={obj.question}
                value={obj.question}
                key={obj.id}
                // checked={false}
                onChange={handleChecked}
              >
                {obj.question}
              </Checkbox>
            ))}
          </CheckboxGroup> */
}
