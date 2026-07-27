import { logError, logWarn } from '@codama/errors';
import { deleteDirectory, writeRenderMapVisitor } from '@codama/renderers-core';
import { renderVisitor as renderRustVisitor } from '@codama/renderers-rust';
import { rootNodeVisitor, visit } from '@codama/visitors-core';
import { spawnSync } from 'child_process';

import { GetRenderMapOptions, getRenderMapVisitor } from './getRenderMapVisitor';

export type RenderOptions = GetRenderMapOptions & {
    deleteFolderBeforeRendering?: boolean;
    formatCode?: boolean;
    toolchain?: string;
};

export function renderVisitor(options: RenderOptions) {
    const { projectFolder } = options;

    return rootNodeVisitor(root => {
        // Delete existing generated folder.
        if (options.deleteFolderBeforeRendering) {
            deleteDirectory(projectFolder);
        }

        // Include generated Rust SDK in the crate. As of @codama/renderers-rust@3, the crate
        // folder is the first positional argument and the SDK folder is given relative to it
        // via the `generatedFolder` option.
        visit(
            root,
            renderRustVisitor(projectFolder, {
                formatCode: options.formatCode !== false,
                generatedFolder: 'src/generated_sdk',
                toolchain: options.toolchain,
            }),
        );

        // Render the new files.
        visit(root, writeRenderMapVisitor(getRenderMapVisitor(options), projectFolder));

        // format the code
        if (options.formatCode !== false) {
            const toolchain = options.toolchain ?? '+stable';
            runFormatter('cargo', [toolchain, 'fmt', '--manifest-path', `${projectFolder}/Cargo.toml`]);
        }
    });
}

function runFormatter(cmd: string, args: string[]) {
    const { stdout, stderr, error } = spawnSync(cmd, args);
    if (error?.message?.includes('ENOENT')) {
        logWarn(`Could not find ${cmd}, skipping formatting.`);
        return;
    }
    if (stdout.length > 0) {
        logWarn(`(cargo-fmt) ${stdout ? stdout?.toString() : error}`);
    }
    if (stderr.length > 0) {
        logError(`(cargo-fmt) ${stderr ? stderr.toString() : error}`);
    }
}
