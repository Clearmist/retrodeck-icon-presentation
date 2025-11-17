import { useState } from 'react';
import Colorful from '@uiw/react-color-colorful';
import { hsvaToHslString } from '@uiw/color-convert';
import { Icon } from '@iconify/react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const styles = {
  container: {
    my: 6,
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
      id: 'RD-camera-photo',
      name: 'Take Screenshot',
      ic: 'ic:baseline-screenshot-monitor',
      bx: 'bx:screenshot',
      sui: 'system-uicons:camera-alt',
      pi: 'pixel:retro-camera',
      pai: 'pixelarticons:camera',
    },
    {
      id: 'RD-folder-blue-backup-',
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
      bx: 'bx:fullscreen',
      sui: 'system-uicons:fullscreen',
      pi: 'pixel:expand',
      pai: 'pixelarticons:expand'
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
      id: 'RD-document-save-',
      name: 'Save State (alt)',
      ic: 'ic:baseline-download',
      bx: 'bx:download',
      sui: 'system-uicons:download',
      pi: 'pixel:download-alt',
      pai: 'pixelarticons:download',
    },
    {
      id: 'RD-folder-blue-backup',
      name: 'Load State',
      ic: 'ic:baseline-file-upload',
      bx: 'bx:upload',
      sui: 'system-uicons:upload',
      pi: 'pixelarticons:upload',
      pai: 'pixelarticons:upload',
    },
    {
      id: 'RD-media-playback-pause',
      name: 'Pause/Resume',
      ic: 'ic:baseline-pause',
      bx: 'bx:pause',
      sui: 'system-uicons:play-button',
      pi: 'pixel:pause',
      pai: 'pixelarticons:pause',
    },
    {
      id: 'RD-ESC',
      name: 'Escape',
      im: 'keyboard-escape',
    }
  ],
  stateMenu: [
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
      id: 'RD-document-save-',
      name: 'Save State (alt)',
      ic: 'ic:baseline-download',
      bx: 'bx:download',
      sui: 'system-uicons:download',
      pi: 'pixel:download-alt',
      pai: 'pixelarticons:download',
    },
    {
      id: 'RD-folder-blue-backup',
      name: 'Load State',
      ic: 'ic:baseline-file-upload',
      bx: 'bx:upload',
      sui: 'system-uicons:upload',
      pi: 'pixelarticons:upload',
      pai: 'pixelarticons:upload',
    },
    {
      id: 'RD-go-previous',
      name: 'Previous State',
      ic: 'ic:baseline-skip-previous',
      bx: 'bx:skip-previous',
      sui: 'system-uicons:push-left',
      pi: 'pixel:angle-left',
      pai: 'pixelarticons:arrow-bar-left',
    },
    {
      id: 'RD-go-next',
      name: 'Next State',
      ic: 'ic:baseline-skip-next',
      bx: 'bx:skip-next',
      sui: 'system-uicons:push-right',
      pi: 'pixel:angle-right',
      pai: 'pixelarticons:arrow-bar-right',
    },
    {
      id: 'RD-Arrow-34',
      name: 'Undo Save State',
      ic: 'ic:baseline-undo',
      bx: 'bx:undo',
      sui: 'system-uicons:undo',
      pai: 'pixelarticons:undo',
    },
    {
      id: 'RD-Arrow-33',
      name: 'Undo Load State',
      ic: 'ic:baseline-redo',
      bx: 'bx:redo',
      sui: 'system-uicons:redo',
      pai: 'pixelarticons:redo',
    },
  ],
  speedFramesMenu: [
    {
      id: 'RD-org.xfce.session',
      name: 'Fast Forward',
      ic: 'ic:baseline-fast-forward',
      bx: 'bx:fast-forward',
      sui: 'system-uicons:chevron-right-double',
    },
    {
      id: 'RD-view-refresh',
      name: 'Rewind',
      ic: 'ic:baseline-fast-rewind',
      bx: 'bx:rewind',
      sui: 'system-uicons:chevron-left-double',
    },
    {
      id: 'RD-zoom-in',
      name: 'Increase Emulation Speed',
      ic: 'ic:baseline-speed',
      sui: 'system-uicons:gauge{flip-horizontal}',
      pai: 'pixelarticons:speed-fast',
      im: 'speedometer-slow{flip-horizontal}',
    },
    {
      id: 'RD-zoom-out',
      name: 'Decrease Emulation Speed',
      ic: 'ic:baseline-speed{flip-horizontal}',
      sui: 'system-uicons:gauge',
      pai: 'pixelarticons:speed-slow',
      im: 'speedometer-slow',
    },
    {
      id: 'RD-zoom-original',
      name: 'Reset Emulation Speed',
      pai: 'pixelarticons:speed-medium',
      im: 'speedometer-reset',
      sui: 'system-uicons:reset-hard',
    },
    {
      id: 'RD-battery-missing',
      name: 'Disable Emulation Speed Limit',
      ic: 'ic:baseline-timer-off',
      bx: 'bx:alarm-off',
      pi: 'pixel:octagon-times',
      pai: 'pixelarticons:mail-off',
    },
    {
      id: 'RD-battery-full-charging',
      name: 'Frame Limit On / Off',
      ic: 'ic:baseline-timer',
      bx: 'bx:timer',
      sui: 'system-uicons:alarm-clock',
      pi: 'pixel:clock',
      pai: 'pixelarticons:clock',
    },
  ],
  displayMenu: [
    {
      id: 'RD-list-add',
      name: 'Increase Resolution / Upscale',
      ic: 'ic:baseline-zoom-out-map',
      bx: 'bx:zoom-in',
      sui: 'system-uicons:zoom-in',
    },
    {
      id: 'RD-list-remove',
      name: 'Decrease Resolution / Downscale',
      ic: 'ic:baseline-zoom-in-map',
      bx: 'bx:zoom-out',
      sui: 'system-uicons:zoom-out',
    },
    {
      id: 'RD-preferences-desktop-display',
      name: 'Change Widescreen / Aspect Ratio',
      ic: 'ic:baseline-expand{270}',
      bx: 'bx:expand-horizontal',
      sui: 'system-uicons:expand-width',
      pi: 'pixel:sort{270}',
      pai: 'pixelarticons:expand{270}',
    },
    {
      id: 'RD-zoom-fit-best',
      name: 'Fullscreen Toggle',
      ic: 'ic:baseline-fullscreen',
      bx: 'bx:fullscreen',
      sui: 'system-uicons:fullscreen',
      pi: 'pixel:expand',
      pai: 'pixelarticons:expand'
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
      id: 'RD-preferences-system-windows-actions',
      name: 'Change Dual Screens Layout',
      ic: 'ic:baseline-splitscreen',
      bx: 'bx:bracket',
      sui: 'system-uicons:display',
      pi: 'pixel:page-break',
      pai: 'pixelarticons:layout-rows',
    },
  ],
}

// iconsmind https://www.flaticon.com/authors/iconsmind/outline?author_id=6855
const ICONSIZE = 42;

function RenderIcon({ color, iconName }) {
  if (!iconName) {
    return null;
  }

  const rotate270 = iconName.includes('{270}');
  const hFlip = iconName.includes('{flip-horizontal}');
  const name = iconName.replace('{flip-horizontal}', '').replace('{270}', '');
  const style = {};

  if (rotate270) {
    style.transform = 'rotate(270deg)';
  }

  return (
    <Tooltip title={name}>
      <Box sx={styles.iconBox}>
        <Icon icon={name} width={ICONSIZE} height={ICONSIZE} color={color} hFlip={hFlip} style={style} />
      </Box>
    </Tooltip>
  );
}

export default function App() {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [colorString, setColorString] = useState('');
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
  });

  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'originalIcon',
      headerName: 'Existing Icon',
      sortable: false,
      cellClassName: 'bg-light-grey',
      renderCell: (params) => {
        const src = new URL(`./assets/original/${params.id.replace(/-+$/, '')}.png`, import.meta.url);

        return (
          <Tooltip title={params.id}>
            <Box sx={styles.iconBox}>
              <img src={src} height={ICONSIZE} alt={params.id} />
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
    },
    {
      field: 'im',
      headerName: 'iconsmind',
      sortable: false,
      renderCell: ({ value }) => {
        if (!value) {
          return null;
        }

        const hFlip = value.includes('{flip-horizontal}');
        const name = value.replace('{flip-horizontal}', '');
        const src = new URL(`./assets/iconsmind-outline/${name}.png`, import.meta.url);
        const style = {};

        if (hFlip) {
          style.transform = 'scaleX(-1)';
        }

        return (
          <Tooltip title={name}>
            <Box sx={styles.iconBox}>
              <img src={src} style={style} width={ICONSIZE} height={ICONSIZE} alt={name} />
            </Box>
          </Tooltip>
        );
      },
    },
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
        <Typography gutterBottom>Pixel Icon and Pixelarticons have a pixel art feel. They look great and fit the theme, but pixelation is not clear for some users and the pictures don't often match the modern icons users expect.</Typography>
        <Typography>iconsmind is here for icons of keyboard keys.</Typography>
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
      <Stack gap={5} direction="column">
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>Quick Menu</Typography>
          <DataGrid
            rows={rows.quickMenu}
            columns={columns}
            disableRowSelectionOnClick
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={setColumnVisibilityModel}
            hideFooter
          />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>State Menu</Typography>
          <DataGrid
            rows={rows.stateMenu}
            columns={columns}
            disableRowSelectionOnClick
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={setColumnVisibilityModel}
            hideFooter
          />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>Speed / Frames Menu</Typography>
          <DataGrid
            rows={rows.speedFramesMenu}
            columns={columns}
            disableRowSelectionOnClick
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={setColumnVisibilityModel}
            hideFooter
          />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>Display / Graphics Menu</Typography>
          <DataGrid
            rows={rows.displayMenu}
            columns={columns}
            disableRowSelectionOnClick
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={setColumnVisibilityModel}
            hideFooter
          />
        </Box>
      </Stack>
    </Container>
  )
}
