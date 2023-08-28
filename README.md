# Moodys challenge

## Decisions

I decided to use Ant design as a component library as it has a lot of options for components and will allow me to move fast with this challenge, it also has pagination out of the box which is something I will need to implement anyway for performance, a little customisation is lost with styling and I may have to code my own filter depending on how the in built one performs.

I'm going with pagination to handle the performance as it allows the user to skip to a certain part of the data rather than with something like virtualisation they would have to scroll for a long time to find something. If the data grows, keeping all the data on client side may become an overhead in that case fetching from the api based on the page also seems like a simpler solution than scrolling.
