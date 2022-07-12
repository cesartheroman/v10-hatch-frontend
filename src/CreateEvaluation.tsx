import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Input,
  Box,
  Label,
  Button,
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
  Grid,
  Column,
} from "@twilio-paste/core";
import { useUIDSeed } from "react-uid";

/**
 * This is the Evaluation Creation view for the EM and HM Roles
 * Filling out all input elements other than reviewers is required and upon completion sends/creates a new
 * evaluation in the database. Major styling is handled via Paste.
 */

// TODO: Role check logic
// TODO: Update Nav Bar

type Question = {
  id: number;
  question: string;
};

const CreateEvaluation = () => {
  /**
   * CONSTANTS
   *
   * questions = avaialable questions for use in Evaluation
   * title = title input entered by user
   * selectedQuestions = array of question id from user input
   * items = default filtered items for Paste pillgroup
   * apprentices = all apprentices receiver from database
   * selectedApprentice = apprentice selected by user
   * filteredItems = review array for user selection
   * formPillState - seed - inputId = used for Paste component multi combobox https://paste.twilio.design/primitives/combobox-primitive/#about-the-combobox-primitive
   * baseURL = the url of the API server that will be connected via Axios GET command.
   * userID - role = will be prop of user meta data
   *
   */

  const [questions, setQuestions] = useState<Question[]>([
    { id: 999, question: "what?" },
  ]);
  const [title, setTitle] = useState<string>("");
  const [selectedQuestions, setSelectedQuestions] = useState<Array<string>>([]);
  const items = [{ name: "ryder" }];
  const [apprentices, setApprentices] = useState([
    {
      id: 1,
      Name: "Ryder Wendt",
      EvaluationsID: "1",
      roleID: 1,
      Email: "Ryder@test.com",
      Password: "Shhhhh",
    },
    {
      id: 2,
      Name: "Invader Zim",
      EvaluationsID: "2",
      roleID: 1,
      Email: "IZ@test.com",
      Password: "Shhhhh",
    },
  ]);
  const [selectedApprentice, setSelectedApprentice] = useState<number>(1);
  const [filteredItems, setFilteredItems] = useState([...items]);

  const seed = useUIDSeed();
  const formPillState = useFormPillState();
  const inputId = seed("input-element");
  const baseURL: string = "http://localhost:3000/";
  // TODO: Get Meta data as props

  /**
   * Mock meta data from login
   */
  const currentUser = {
    id: 2,
    name: "Jiminy Cricket",
    role: 4,
  };

  /**
   * handleChecked - Handles checkbox state in question selection
   * @param e = click event object
   */

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedQuestions((prev) => [...prev, value]);
    } else {
      setSelectedQuestions((prev) => prev.filter((x) => x !== value));
    }
  };

  /**
   * UseEffect - on page render UseEffect gets called and runs 3 functions, getting all
   * reviewers exept apprentices, gets all questions avaiable to be assigned, gets all apprentices
   * based on users role
   */

  useEffect(() => {
    getReviewers();
    getQuestions();
    getApprentices();
  }, []);

  /**
   * getQuestions = pulls questions from data base and sets to questions
   */

  const getQuestions = () => {
    // TODO: Connect to backend /api/v1/questions
    axios
      .get(baseURL + "questions")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => console.log(err));
  };

  /**
   * getReviewers - pulls most recent list of reviewers from database excluding reviewers
   * with the role of apprentice -> roleID = 1
   */

  const getReviewers = () => {
    // TODO: /api/v1/users/
    axios
      .get(baseURL + "users")
      .then((res) => {
        let currentReviewers = res.data.filter(
          (user: any) => user.roleID !== "1"
        );
        setFilteredItems(currentReviewers);
      })
      .catch((err) => console.log(err));
  };

  /**
   * getApprentices - Retreives apprentices based on role.
   * 4 = HM roleId, function will grab all apprentices to choose from
   * 3 = EM roleId, function will grab only apprentices assigned to EM
   */

  const getApprentices = () => {
    try {
      if (currentUser.role === 4) {
        // TODO: /api/v1/users/apprentices/

        axios.get(baseURL + "apprentices").then((res) => {
          setApprentices(res.data);
          setSelectedApprentice(res.data[0].id);
        });
      } else {
        // TODO: GET apprentice assigned api/v1/users/managers/id/apprentices
        //       grab id from meta data
        axios.get(baseURL + "apprenticeByManagerID").then((res) => {
          setApprentices(res.data);
          setSelectedApprentice(res.data[0].id);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * submit function - posts eval to database with data from form selection.
   * reviewData filters selected reviewrs and grabs only the ids to be sent to database
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e = event
   */

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: POST eval api/v1/evalutations
    //       on post have confirm modal or redirect
    // selected reviews array are stored in selectedItems
    e.preventDefault();
    let reviewData = Object.keys(selectedItems).map((key: any) => {
      return selectedItems[key].id;
    });

    let data = {
      title,
      apprenticeID: selectedApprentice,
      managerID: "manager id",
      reviewerIDs: reviewData,
      questionIDs: selectedQuestions,
    };
    console.log(data);
    axios.post(baseURL + "questions" + 1, data).then((res) => {
      console.log("POST Response:", res);
    });
  };

  /**
   * This section belongs to select reviewer logic, ends on component return.
   * Paste multi combo box component
   */

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultiSelectPrimitive<any>({});

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
      <Grid gutter="space30">
        <Column span={8} offset={2}>
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
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Box>

            <Label htmlFor="apprentice_select">Select Apprentice</Label>
            <Box marginBottom="space80">
              <Select
                id="apprentice_select"
                onChange={(e: any) => setSelectedApprentice(e.target.value)}
                defaultValue={apprentices[0].id}
                required
              >
                {apprentices.map((apprentice: any, i: any) => {
                  return (
                    <Option key={apprentice.id} value={apprentice.id} id={i}>
                      {apprentice.Name}
                    </Option>
                  );
                })}
              </Select>
            </Box>

            <Box padding={"space10"} marginBottom="space80">
              <div>
                <h2>Select questions to appear on evaluation</h2>
                {questions.map((question, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      name="selected-questions"
                      value={question.id}
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
                    value={""}
                  />
                </Box>
                <ComboboxListbox hidden={!isOpen} {...getMenuProps()}>
                  <ComboboxListboxGroup>
                    {filteredItems.map((filteredItem: any, index) => (
                      <ComboboxListboxOption
                        highlighted={highlightedIndex === index}
                        variant="default"
                        key={index}
                        {...getItemProps({
                          item: filteredItem,
                          index,
                          key: filteredItem.id,
                        })}
                      >
                        {filteredItem.name}
                      </ComboboxListboxOption>
                    ))}
                  </ComboboxListboxGroup>
                </ComboboxListbox>
              </Box>
              <FormPillGroup
                {...formPillState}
                aria-label="Selected components"
              >
                {selectedItems.map((item: any, index) => {
                  return (
                    <FormPill
                      {...getSelectedItemProps({
                        selectedItem,
                        index,
                        key: item.id,
                      })}
                      tabIndex={null}
                      {...formPillState}
                      onDismiss={() => handleRemoveItemOnClick(item)}
                    >
                      {item.name}
                    </FormPill>
                  );
                })}
              </FormPillGroup>
              <br />
            </>
            <Box justifyContent="end">
              {/* TODO: Add toast on submit! */}
              <Button
                size="default"
                onClick={handleSubmit}
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            </Box>
          </Card>
        </Column>
      </Grid>
    </Box>
  );
};

export default CreateEvaluation;
