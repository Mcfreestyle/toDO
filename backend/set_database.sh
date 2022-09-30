#!/bin/bash

echo "Populating tables with dummy data"
cat sql-scripts/feed_database.sql | sqlite3 api/v1/book.sqlite
