import { useState } from 'react';
import Colorful from '@uiw/react-color-colorful';
import { hsvaToHslString } from '@uiw/color-convert';
import { Icon } from '@iconify/react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const styles = {
  container: {
    mt: 4,
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
};

const rows = {
  quickMenu: [
    {
      id: 'RD-process-stop',
      name: 'Quit Emulator',
      ic: 'ic:baseline-exit-to-app',
      bx: 'bx:exit',
      sui: 'system-uicons:exit-right',
      pi: 'pixel:window-close',
      pai: 'pixelarticons:close-box',
    },
    {
      id: 'RD-preferences-tweaks-shadows',
      name: 'Open Menu',
      ic: 'ic:baseline-menu',
      bx: 'bx:menu',
      sui: 'system-uicons:menu-hamburger',
      pi: 'pixel:bars',
      pai: 'pixelarticons:menu',
    },
    {
      id: 'RD-system-switch-user',
      name: 'Swap Screens',
      ic: 'ic:baseline-swap-vert',
      bx: 'bx:move-vertical',
      sui: 'system-uicons:swap',
      pi: 'pixel:arrow-down',
      pai: 'pixelarticons:arrows-vertical'
    },
    {
      id: 'RD-document-save',
      name: 'Save State',
      ic: 'ic:outline-save',
      bx: 'bx:save',
      sui: 'system-uicons:floppy',
      pi: 'pixel:save',
      pai: 'pixelarticons:save',
    },
    {
      id: 'RD-camera-photo',
      name: 'Take Screenshot',
      ic: 'ic:baseline-screenshot-monitor',
      bx: 'bx:screenshot',
      sui: 'system-uicons:camera-alt',
      pi: 'pixel:retro-camera',
      pai: 'pixelarticons:camera',
    },
    {
      id: 'RD-folder-blue-backup',
      name: 'Restart/Reset',
      ic: 'ic:baseline-restart-alt',
      bx: 'bx:reset',
      sui: 'system-uicons:reset',
      pi: 'pixel:refresh',
      pai: 'pixelarticons:repeat',
    },
    {
      id: 'RD-zoom-fit-best',
      name: 'Fullscreen Toggle',
      ic: 'ic:baseline-fullscreen',
    }
  ],
}

const ICONSIZE = 42;

function RenderIcon({ color, iconName }) {
  return (
    <Tooltip title={iconName}>
      <Box sx={styles.iconBox}>
        <Icon icon={iconName} width={ICONSIZE} height={ICONSIZE} color={color} />
      </Box>
    </Tooltip>
  );
}

export default function App() {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [colorString, setColorString] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'originalIcon',
      headerName: 'Existing Icon',
      sortable: false,
      renderCell: (params) => {
        const src = new URL(`./assets/original/${params.id}.png`, import.meta.url);

        return (
          <Tooltip title={params.id}>
            <Box sx={styles.iconBox}>
              <img src={src} width={ICONSIZE} height={ICONSIZE} alt={params.id} />
            </Box>
          </Tooltip>
        );
      },
    },
    {
      field: 'ic',
      headerName: 'Google Material',
      sortable: false,
      renderCell: ({ value }) => <RenderIcon iconName={value} color={colorString} />,
    },
    {
      field: 'bx',
      headerName: 'BoxIcons',
      sortable: false,
      renderCell: ({ value }) => <RenderIcon iconName={value} color={colorString} />,
    },
    {
      field: 'sui',
      headerName: 'System UIcons',
      sortable: false,
      renderCell: ({ value }) => <RenderIcon iconName={value} color={colorString} />,
    },
    {
      field: 'pi',
      headerName: 'Pixel Icon',
      sortable: false,
      renderCell: ({ value }) => <RenderIcon iconName={value} color={colorString} />,
    },
    {
      field: 'pai',
      headerName: 'Pixelarticons',
      sortable: false,
      renderCell: ({ value }) => <RenderIcon iconName={value} color={colorString} />,
    }
  ];

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Alert severity="info">
        The icon requirements are png at 128x128. The icons here (excepting the originals) are all SVG
        which means they can be any size while retaining the same quality and their line strokes can be any color.
        The workflow would be: choose the icon pack, choose stroke color, export to PNG.
        If a pack is missing an appropriate icon then we can fill it from a different pack.
      </Alert>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography gutterBottom>Google Material Design is the standard for modern applications. It is published by Google for use in their applications and all Android apps.</Typography>
        <Typography gutterBottom>BoxIcons is quite popular for web design.</Typography>
        <Typography gutterBottom>System UIcons is meant for operating systems and looks very clean.</Typography>
        <Typography>Pixel Icon and Pixelarticons have a pixel art feel. They look great and fit the theme, but pixelation is not clear for some users and the pictures don't often match the modern icons users expect.</Typography>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4 }}>
        <Colorful
          color={hsva}
          onChange={(color) => {
            setHsva(color.hsva);
            setColorString(hsvaToHslString(color.hsva));
          }}
        />
      </Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Quick Menu</Typography>
        <DataGrid
          rows={rows.quickMenu}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  )
}
