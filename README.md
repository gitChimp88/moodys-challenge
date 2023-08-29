# Moodys challenge

## Decisions

I decided to use Ant design as a component library as it has a lot of options for components and will allow me to move fast with this challenge, it also has pagination out of the box which is something I will need to implement anyway for performance, a little customisation is lost with styling and I may have to code my own filter depending on how the in built one performs.

I'm going with pagination to handle the performance as it allows the user to skip to a certain part of the data rather than with something like virtualisation they would have to scroll for a long time to find something. If the data grows, keeping all the data on client side may become an overhead in that case fetching from the api based on the page also seems like a simpler solution than scrolling.

Now that I have the table displaying and the requirements covered I will test and optimise the code for performance.

Performance starts to slow at around 50,000 records with 6 x slower cpu and slow network (tested from chrome)
If we were to use pagination to fetch records from the server each time user clicks on the page numbers we could set up a server side filtering also with debouncing, after a short period of time of no typing it would call the server with what the user typed, filter the large data set and send back the data.
That way we keep the large amount of data off of the client while still having access to it from the server.

I have also abstracted the filter so it can be used in other parts of the code and put a placeholder for images so a blank box isn't shown while they are loading.
The filter function is wrapped with useCallback to prevent recreation of the function on every render seeing as it is passed as a prop to search component.
The generation of columns is memoized as it can reuse the columns unless it's dependency changes.
