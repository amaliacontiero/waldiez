# SPDX-License-Identifier: Apache-2.0.
# Copyright (c) 2024 - 2025 Waldiez and contributors.
"""Factory function for creating a ToolsExporter instance."""

from pathlib import Path
from typing import Optional, Union

from waldiez.models import WaldiezAgent, WaldiezTool

from ..core import ExporterContext, get_default_exporter_context
from .exporter import ToolsExporter


def create_tools_exporter(
    flow_name: str,
    agents: list[WaldiezAgent],
    agent_names: dict[str, str],
    tools: list[WaldiezTool],
    tool_names: dict[str, str],
    output_dir: Optional[Union[str, Path]] = None,
    context: Optional[ExporterContext] = None,
) -> ToolsExporter:
    """Create a tools exporter.

    Parameters
    ----------
    flow_name : str
        The name of the flow.
    agents : list[WaldiezAgent]
        The agents that use tools.
    agent_names : dict[str, str]
        Mapping of agent IDs to names.
    tools : list[WaldiezTool]
        The tools to export.
    tool_names : dict[str, str]
        Mapping of tool IDs to names.
    output_dir : Optional[Union[str, Path]], optional
        Output directory for generated files, by default None
    context : Optional[ExporterContext], optional
        Exporter context with dependencies, by default None

    Returns
    -------
    ToolsExporter
        The created tools exporter.
    """
    if context is None:
        context = get_default_exporter_context()
    return ToolsExporter(
        flow_name=flow_name,
        agents=agents,
        agent_names=agent_names,
        tools=tools,
        tool_names=tool_names,
        output_dir=output_dir,
        context=context,
    )
