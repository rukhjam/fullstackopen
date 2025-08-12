sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 response with {"message":"note created"}
    deactivate server

    Note right of browser: The browser executes the callback function in `spa.js` that re-renders the notes