# Separation of Concerns

Finish the order tracking application from class.

## Requirements

Create the remaining CRUD routes for the order model. Use the red, green,
refactor process.

You will need to add handlers for the `GET`, `PATCH`, & `DELETE` HTTP methods.

Test and build out the following requirements for your application:
1. `✓ should GET all orders`
1. `✓ should GET an order by id`
1. `✓ should PATCH an order by id`
1. `✓ should DELETE an order by id`

When an order is updated send a text message notifying the order
handler that an order was updated.

When an order is deleted send a text message notifying the order
handler that an order was deleted

## Rubric

* model class (3 points)
* service class (5 points)
* controller (2 points)