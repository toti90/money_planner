import { render, screen } from '@testing-library/react';
import ButtonsSubHeader from './ButtonsSubHeader';
import { RootState } from '../../store';
import { Plan } from '../../models/plan';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';

const middlewares: Middleware[] = [];
const mockStore = configureStore(middlewares);

describe('Async component', () => {
  const allPlan: Plan[] = [
    {
      createdDate: new Date().getTime(),
      id: '1279d5c1-b6c9-4549-98ac-d38dc897eebb',
      name: '2022-January',
      categories: [
        { name: 'Bills', plannedSpent: 100000, actualSpent: 10000 },
        { name: 'Car', plannedSpent: 100000, actualSpent: 80000 },
        { name: 'Food', plannedSpent: 100080, actualSpent: 70000 },
        { name: 'Hobby', plannedSpent: 100, actualSpent: 10000 },
        { name: 'Other', plannedSpent: 15000, actualSpent: 20000 },
        { name: 'Savings', plannedSpent: 150000, actualSpent: 50000 },
      ],
    },
  ];

  test('render no post text visible when store is empty', async () => {
    //Arrange
    const initialState: RootState = {
      auth: { email: 'foo@bar.com', isLoggedIn: true },
      global: { isLoading: false },
      plan: { allPlan: [], currentPlan: null },
    };
    const store = mockStore(initialState);

    //Act
    render(
      <Provider store={store}>
        <ButtonsSubHeader />
      </Provider>,
      {}
    );

    //Assert
    const helloWorldElement = screen.getByText(
      'There are no plan, please create one'
    );
    expect(helloWorldElement).toBeInTheDocument();
    const addFirstPlanButton = screen.getByText('Add first plan');
    expect(addFirstPlanButton).toBeInTheDocument();
    const addNewPlanButton = screen.queryByText('Add new plan');
    expect(addNewPlanButton).toBeNull();
    const select = screen.queryByTestId('select');
    expect(select).toBeNull();
  });

  test('render a select and add new plan when store is not empty', async () => {
    //Arrange
    const initialState: RootState = {
      auth: { email: 'foo@bar.com', isLoggedIn: true },
      global: { isLoading: false },
      plan: { allPlan: allPlan, currentPlan: allPlan[0] },
    };
    const store = mockStore(initialState);

    //Act
    render(
      <Provider store={store}>
        <ButtonsSubHeader />
      </Provider>,
      {}
    );

    //Assert
    const helloWorldElement = screen.queryByText(
      'There are no plan, please create one'
    );
    expect(helloWorldElement).toBeNull();
    const addFirstPlanButton = screen.queryByText('Add first plan');
    expect(addFirstPlanButton).toBeNull();
    const addNewPlanButton = screen.queryByText('Add new plan');
    expect(addNewPlanButton).toBeInTheDocument();
    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
  });

  test('render empty div when isLoading and not currentPlan', async () => {
    //Arrange
    const initialState: RootState = {
      auth: { email: 'foo@bar.com', isLoggedIn: true },
      global: { isLoading: true },
      plan: { allPlan: [], currentPlan: null },
    };
    const store = mockStore(initialState);

    //Act
    render(
      <Provider store={store}>
        <ButtonsSubHeader />
      </Provider>,
      {}
    );

    //Assert
    const helloWorldElement = screen.queryByText(
      'There are no plan, please create one'
    );
    expect(helloWorldElement).toBeNull();
    const addFirstPlanButton = screen.queryByText('Add first plan');
    expect(addFirstPlanButton).toBeNull();
    const addNewPlanButton = screen.queryByText('Add new plan');
    expect(addNewPlanButton).toBeNull();
    const select = screen.queryByTestId('select');
    expect(select).toBeNull();
  });

  test('open dialog when button is clicked', async () => {
    //Arrange
    const initialState: RootState = {
      auth: { email: 'foo@bar.com', isLoggedIn: true },
      global: { isLoading: false },
      plan: { allPlan: allPlan, currentPlan: allPlan[0] },
    };
    const store = mockStore(initialState);

    //Act
    render(
      <Provider store={store}>
        <ButtonsSubHeader />
      </Provider>,
      {}
    );
    const addNewPlanButton = screen.queryByText('Add new plan');
    addNewPlanButton?.click();

    //Assert
    const dialogButton = screen.queryByText('Save');
    expect(dialogButton).toBeInTheDocument();
  });
});
