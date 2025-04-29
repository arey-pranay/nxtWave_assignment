# **NxtWave Technical Content Developer - Assignment Submission**

## By **Pranay Parikh**

---

### **Overview of the Project**

Hey,
I'm making this file to tell my approach for the **NxtWave Technical Content Developer Assignment**. The goal of the project is to build a responsive React-based application that interacts with an API to manage lists. In this submission, I’ll describe the steps I intend to follow, the technologies I plan to use, and the structure I’ll adhere to in order to meet the assignment’s requirements.

#### **Tech Stack**

- **create-react-app**: I intend to use **create-react-app** to set up the project as required by the assignment guidelines. It provides an easy and reliable foundation for React applications.
- **TailwindCSS**: I plan to use **TailwindCSS** for styling. Its utility-first approach allows for quick and flexible styling, ensuring that the app is both responsive and modern-looking.

> **Note**: Although tools like **Next.js** or **Vite** were considered for a more modern approach, I will be using **create-react-app** as it is explicitly mentioned in the assignment requirements.

---

### **Features to be Implemented**

Here are the features I plan to implement:

- **List Creation**: A feature to create new lists, interact with the API, and display the lists in a user-friendly manner.
- **Responsive UI**: The app will be designed to look and function well on various screen sizes (Medium, Large, and Extra Large).
- **Loading & Error Handling**: I will implement proper handling for API loading and error states to ensure a smooth user experience.
- **State Management**: I intend to use **React Hooks** (`useState`, `useEffect`) to manage the state of the app. This approach is suitable due to the simplicity of the project and the limited timeline, eliminating the need for external state management libraries (e.g., Redux).

---

### **API to be Used**

The application will fetch data from the only 1 API:

- **List Creation API**:
  - **Endpoint**: `https://apis.ccbp.in/list-creation/lists`
  - This API will be used to fetch list data and manage the list items in the app.

---

### **Development Approach**

1. **Analyzing Screens**:
   - I’ll start by reviewing the provided screen designs and analyzing the components required. I will also consider how the app should behave in different screen sizes.
2. **Execution Level Plan (ELP)**:
   - I will break the UI into reusable components, focusing on modularity and clarity.
   - I’ll identify where to maintain the state (within components, using React Hooks) and list down the possible states for each component (loading, success, error, etc.).
3. **Building the App**:
   - I will start by building the common components such as buttons, input fields, and list items.
   - Next, I will compose these components to form the overall layout.
   - **TailwindCSS** will be used to style the components, ensuring responsiveness and a modern design.
4. **Handling API Requests**:
   - I will integrate the API using **React’s `useEffect`** and **`useState`** hooks to fetch and display list data.
   - I will handle the API status (loading, success, failure) gracefully to ensure a smooth user experience.
5. **Testing & Refining**:
   - I’ll test the app on various screen sizes to verify that the responsiveness is functioning as expected.
   - I will also test error handling and the general flow of the app to ensure everything works smoothly.

---

### **Extra Feature**

**Caching and Data Persistence**:

- I used localStorage to store the last updated lists of the user and check it every time before making a new API call.
- If the user still wants a new session, there is a button to reset the localStorage and start from the new lists too.

### ** Feature Checklist (For My Personal Testing) **

- **Shift Data between Lists (1 to 3)**: Validate that I can shift data from old list to new. ✅
- **Shift Data between Lists (3 to 1)**: Validate that I can shift data from new list to old. ✅
- **Shift Data between Lists (3 to 2)**: Validate that I can shift data from 1 old list to another old list. ✅
- **Update Confirmation**: Verify that a new list is created when the update button is clicked. ✅
- **More Than 3 Lists**: Verify that the app handles scenarios where more than three lists are created or displayed. ✅
- **Cancel Feature**: Check that users can cancel an ongoing action, such as list creation. ✅
- **Responsiveness**: Test the app on various screen sizes to confirm it adapts properly (Medium, Large, Extra Large). ✅
- **Loading State**: Verify that a loading indicator is displayed while the API request is in progress. ✅
- **Error Handling**: Ensure that appropriate error messages are shown when the API request fails. ✅
- **Data Persistence**: Ensure that the app correctly uses localStorage to persist data across sessions. ✅
- **Reset Lists**: Test the reset functionality to clear localStorage and start with a fresh session. ✅
