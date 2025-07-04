require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// FIX: Corrected import to match actual file name
const analyzerRoutes = require('./routes/analyzerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/analyze', analyzerRoutes);

app.get('/', (req, res) => {
  res.send('URL Performance Analyzer API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
